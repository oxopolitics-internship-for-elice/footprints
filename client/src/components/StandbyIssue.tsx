import { useEffect } from 'react';
import * as api from '@src/api/api';
import { standbyIssueState } from '@src/store/StandbyIssueState';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { IssueTypes } from '@src/types/IssueTypes';

const StandbyIssue = (): JSX.Element => {
  const [issueList, setIssueList] = useRecoilState(standbyIssueState);
  useEffect(() => {
    const getIssueList = async () => {
      try {
        const res = await api.get('/IssueMockData.json');
        setIssueList(res.data);
      } catch (Error) {
        alert('에러가 발생했습니다. 다시 시도해주세요: ', Error);
      }
    };
    getIssueList();
  }, []);

  const regiHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElem = e.target as HTMLButtonElement;
    setIssueList((prev): IssueTypes[] => {
      const prevIssueList: IssueTypes[] = JSON.parse(JSON.stringify(prev));
      prevIssueList.forEach((issue) => {
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
        const res = await api.put('/IssueMockData.json', issueList);
        console.log(res.data);
      } catch (Error) {
        console.log(Error);
      }
    };
    putIssueList();
  }, [issueList]);

  if (issueList) {
    return (
      <div>
        {issueList.map((issue) => {
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
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default StandbyIssue;

const Issue = styled.article`
  border: grey 1px solid;
  border-radius: 2px;
  padding: 20px;
`;
