import { useEffect, useState } from 'react';
import issueState from '@/store/IssueState';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { IssueTypes } from '@/types/IssueTypes';
import * as Api from '@/api/Api';

const StandbyIssue = (): JSX.Element => {
  const fetchedIssue: IssueTypes[] = useRecoilValue(issueState);
  const [issueList, setIssueList] = useState(fetchedIssue);

  const regiHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElem = e.target as HTMLButtonElement;
    setIssueList((prev: any): IssueTypes[] => {
      const prevIssueList: IssueTypes[] = JSON.parse(JSON.stringify(prev));
      prevIssueList.forEach(issue => {
        if (issue._id === targetElem.dataset.id) {
          if (targetElem.innerText === '반대') {
            issue.regi.con += 1;
          } else {
            issue.regi.pro += 1;
          }
        }
      });
      return prevIssueList;
    });
  };
  //issue schema가 변경될 때 마다 db에 업데이트
  useEffect(() => {
    const putIssueList = async () => {
      try {
        const res = await Api.put('/IssueMockData.json', issueList);
        console.log(res.data);
      } catch (Error) {
        console.log(Error);
      }
    };
    putIssueList();
  }, [issueList]);

  return (
    <div>
      {issueList.map(
        (issue: { _id: any; createdAt: any; content: any; regi: any }) => {
          const { _id, createdAt, content, regi } = issue;
          const createdDate = new Date(createdAt);
          const year = createdDate.getFullYear();
          const month = createdDate.getMonth() + 1;
          const date = createdDate.getDate();
          const regiDate = `${year}년 ${month >= 10 ? month : '0' + month}월 ${
            date >= 10 ? date : '0' + date
          }일`;
          return (
            <Issue key={_id}>
              <div>{regi.pro - regi.con}/100</div>
              <div>{regiDate}</div>
              <div>{content}</div>
              <button data-id={_id} onClick={regiHandler}>
                찬성
              </button>
              <button data-id={_id} onClick={regiHandler}>
                반대
              </button>
            </Issue>
          );
        },
      )}
    </div>
  );
};

export default StandbyIssue;

const Issue = styled.article`
  border: grey 1px solid;
  border-radius: 2px;
  padding: 20px;
`;
