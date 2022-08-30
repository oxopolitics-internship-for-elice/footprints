import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IssueTypes } from '@/types/IssueTypes';
import Issue from './Issue';
import styled from '@emotion/styled';
import errorHandler from '@/api/ErrorHandler';
import StandbyIssueAPI from '@/api/StandbyIssueAPI';
import Loading from '@components/base/Loading';

export interface IssueProps {
  issue: IssueTypes;
  setIssueList: (value: React.SetStateAction<IssueTypes[]>) => void;
}

const StandbyIssue = (): JSX.Element => {
  const [issueList, setIssueList] = useState<IssueTypes[]>([]);
  const targetRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState(null);

  const id = useLocation().pathname.split('/')[2];
  const loadMore = () => {
    setPageNum(prev => prev + 1);
  };

  //데이터 fetch
  const getIssue = async () => {
    try {
      setIsLoading(true);
      const res = await StandbyIssueAPI.getList(id, pageNum);
      setIssueList([...issueList, ...res.data.data]);
      setMaxPage(res.data.meta.pageCount);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getIssue();
  }, [pageNum]);
  //infinite scroll
  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
          observer.disconnect();
        }
      },
    );
    if (maxPage && pageNum > maxPage) {
      alert('더 이상 로드할 컨텐츠가 없습니다.');
      return;
    }
    observer.observe(targetRef.current);
  }, [pageNum]);

  return (
    <StandbyIssueContainer>
      {!isLoading ? (
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
        <Loading />
      )}
      <div ref={targetRef}>{''}</div>
    </StandbyIssueContainer>
  );
};

export default StandbyIssue;

const StandbyIssueContainer = styled.div`
  padding: 40px 20px 20px 20px;
`;
