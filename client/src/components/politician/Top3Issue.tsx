import { useEffect, useState } from 'react';
import TopIssueAPI from '@/api/TopIssueAPI';
import styled from '@emotion/styled';
import Issue from './Issue';
import { IssueTypes } from '@/types/IssueTypes';
import theme from '@/styles/theme';
import errorHandler from '@/api/ErrorHandler';
import { useLocation } from 'react-router-dom';

const Top3Issue = () => {
  const id = useLocation().pathname.split('/')[2];
  const [topIssue, setTopIssue] = useState<IssueTypes[]>([]);
  useEffect(() => {
    const getTopIssue = async () => {
      try {
        const res = await TopIssueAPI.getList(id);
        setTopIssue(res.data);
      } catch (error) {
        errorHandler(error);
      }
    };
    getTopIssue();
  }, [id]);

  return (
    <>
      <InfoDiv>
        * 특정 사건이 해당 정치인의 그래프에 등록되어야 할 지 찬성/반대 투표를
        해주세요. <br />
        찬성 투표수가 일정 기준을 넘어야 그래프에 등록됩니다.
      </InfoDiv>
      <Title>마감이 임박했어요!</Title>
      <TopIssueContainer>
        {topIssue.map(issue => {
          return (
            <Issue issue={issue} setIssueList={setTopIssue} key={issue._id} />
          );
        })}
      </TopIssueContainer>
    </>
  );
};

export default Top3Issue;

const InfoDiv = styled.div`
  color: ${theme.colors.mainColor};
  text-align: right;
`;
const TopIssueContainer = styled.div`
  border: ${theme.colors.mainColor} 10px solid;
  border-radius: 20px;
  padding: 20px 20px 0 20px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bolder;
  padding-bottom: 15px;
`;
