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
        *찬성 수가 75 이상, 반대의 3배 이상일 때 그래프에 등록됩니다.
      </InfoDiv>
      <TopIssueContainer>
        <Title>마감이 임박했어요!</Title>
        <div>
          {topIssue.map(issue => {
            return (
              <Issue issue={issue} setIssueList={setTopIssue} key={issue._id} />
            );
          })}
        </div>
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
  border-bottom: ${theme.colors.subColor} 2px solid;
  border-radius: 2px;
  padding: 20px;
  width: 1200px;
  margin: auto;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bolder;
  padding-bottom: 15px;
`;
