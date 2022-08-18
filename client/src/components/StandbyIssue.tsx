import { useEffect } from 'react';
import * as api from '@src/api/api';
import { standbyIssueState } from '@src/store/StandbyIssueState';
import { useRecoilState } from 'recoil';

const StandbyIssue = (): JSX.Element => {
  const [issueList, setIssueList] = useRecoilState(standbyIssueState);
  useEffect(() => {
    const getIssueList = async () => {
      try {
        const res = await api.get('/IssueMockData.json');
        setIssueList(res.data);
      } catch (Error) {
        console.log(Error);
      }
    };
    getIssueList();
  }, []);

  if (issueList) {
    return (
      <div>
        {issueList.map((issue) => {
          const { _id, createdAt, content } = issue;
          const createdDate = new Date(createdAt);
          const year = createdDate.getFullYear();
          const month = createdDate.getMonth() + 1;
          const date = createdDate.getDate();
          const regiDate = `${year}년 ${month >= 10 ? month : '0' + month}월 ${
            date >= 10 ? date : '0' + date
          }일`;
          return (
            <article key={_id}>
              <div>{regiDate}</div>
              <div>{content}</div>
              <button>찬성</button>
              <button>반대</button>
            </article>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default StandbyIssue;
