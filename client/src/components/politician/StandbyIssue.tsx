import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import issueState from '@/store/IssueState';
import { useRecoilValue } from 'recoil';
import { IssueTypes } from '@/types/IssueTypes';
import * as Api from '@/api/Api';
import Issue from './Issue';

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
  const loadMore = () => setPageNum(prev => prev + 1);

  const getIssue = async () => {
    try {
      const res = await Api.get(
        `issues?targetPolitician=${targetPolitician}&pageNum=${pageNum}`,
      );
      setIssueList([...issueList, ...res.data.data]);
    } catch (Error) {
      console.log(`에러가 발생했습니다. 다시 시도해주세요: ${Error}`);
    } finally {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    getIssue();
  }, [pageNum]);

  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      observer.observe(target.current);
    }
  }, []);

  //issue schema가 변경될 때 마다 db에 업데이트
  // useEffect(() => {
  //   const putIssueList = async () => {
  //     try {
  //       // const res = await Api.put('/IssueMockData.json', issueList);
  //       // console.log(res.data);
  //     } catch (Error) {
  //       console.log(Error);
  //     }
  //   };
  //   putIssueList();
  // }, [issueList]);

  return (
    <div>
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
    </div>
  );
};

export default StandbyIssue;
