import { useEffect, useState } from 'react';
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
  const fetchedIssue: IssueTypes[] = useRecoilValue(issueState);
  const [issueList, setIssueList] = useState(fetchedIssue);

  //issue schema가 변경될 때 마다 db에 업데이트
  useEffect(() => {
    const putIssueList = async () => {
      try {
        // const res = await Api.put('/IssueMockData.json', issueList);
        // console.log(res.data);
      } catch (Error) {
        console.log(Error);
      }
    };
    putIssueList();
  }, [issueList]);

  return (
    <div>
      {issueList.map(issue => {
        return <Issue issue={issue} setIssueList={setIssueList} />;
      })}
    </div>
  );
};

export default StandbyIssue;
