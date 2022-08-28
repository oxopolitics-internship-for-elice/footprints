import { useEffect, useState } from 'react';
import * as Api from '@/api/api';
import styled from '@emotion/styled';
import Issue from './Issue';
import { IssueTypes } from '@/types/IssueTypes';

const Top3Issue = () => {
  const target = '6303bed2e9d44f884ed1d640';
  const [topIssue, setTopIssue] = useState<IssueTypes[]>([]);
  useEffect(() => {
    const getTopIssue = async () => {
      try {
        const res = await Api.get(
          `issues?targetPolitician=${target}&ranked=true`,
        );
        setTopIssue(res.data);
      } catch (Error) {
        alert(`에러가 발생했습니다. 다시 시도해주세요: ${Error}`);
      }
    };
    getTopIssue();
  }, [target]);

  return (
    <TopIssueContainer>
      <div>마감이 임박했어요!</div>
      <div>
        {topIssue.map(issue => {
          return (
            <Issue issue={issue} setIssueList={setTopIssue} key={issue._id} />
          );
        })}
      </div>
    </TopIssueContainer>
  );
};

export default Top3Issue;

const TopIssueContainer = styled.div`
  border: grey 2px solid;
  border-radius: 2px;
  padding: 20px;
`;
