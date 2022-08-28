import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import issueState from '@/store/IssueState';
import { useRecoilValue } from 'recoil';
import { IssueTypes } from '@/types/IssueTypes';
import * as Api from '@/api/Api';
import Issue from './Issue';
import styled from '@emotion/styled';

export interface IssueProps {
  issue: IssueTypes;
  setIssueList: (value: React.SetStateAction<IssueTypes[]>) => void;
}

const StandbyIssue = (): JSX.Element => {
  const [issueList, setIssueList] = useState<IssueTypes[]>([]);
  const targetPolitician = '6303bed2e9d44f884ed1d640';
  const target = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  let maxPage: number;

  const loadMore = () => {
    setPageNum(prev => prev + 1);
  };

  //데이터 fetch
  const getIssue = async () => {
    try {
      const res = await Api.get(
        `issues?targetPolitician=${targetPolitician}&perPage=10&pageNum=${pageNum}`,
      );
      setIssueList([...issueList, ...res.data.data]);
      maxPage = res.data.meta.pageCount;
    } catch (Error) {
      console.log(`에러가 발생했습니다. 다시 시도해주세요: ${Error}`);
    } finally {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    getIssue();
  }, [pageNum]);

  //infinite scroll
  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMore();
          if (pageNum > maxPage) {
            observer.unobserve(target.current);
            alert('페이지의 마지막입니다.');
          }
        }
      });
      observer.observe(target.current);
    }
  }, []);

  return (
    <StandbyIssueContainer>
      {isLoading ? (
        <div>
          {issueList.map(issue => {
            return (
              <Issue
                issue={issue}
                setIssueList={setIssueList}
                key={issue._id}
              />
            );
          })}
        </div>
      ) : (
        ''
      )}
      <div ref={target}>{''}</div>
    </StandbyIssueContainer>
  );
};

export default StandbyIssue;

const StandbyIssueContainer = styled.div`
  padding: 40px 20px 20px 20px;
`;
