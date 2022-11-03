import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IssueTypes } from '@/types/IssueTypes';
import Issue from './Issue';
import styled from '@emotion/styled';
import errorHandler from '@/api/ErrorHandler';
import StandbyIssueAPI from '@/api/StandbyIssueAPI';
import Loading from '@components/base/Loading';
import { Alert } from '@components/base/Alert';
import theme from '@/styles/theme';

export interface IssueProps {
  issue: IssueTypes;
  setIssueList: (value: React.SetStateAction<IssueTypes[]>) => void;
}

const StandbyIssue = (): JSX.Element => {
  const [issueList, setIssueList] = useState<IssueTypes[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState<number>(0);

  const id = useLocation().pathname.split('/')[2];
  const loadMore = () => {
    if (pageNum >= maxPage) {
      Alert.fire({
        icon: 'error',
        title: '마지막 페이지입니다.',
      });
    }
    setPageNum(prev => prev + 1);
  };

  //데이터 fetch
  const getIssue = async () => {
    try {
      const res = await StandbyIssueAPI.getList(id, pageNum);
      setIssueList([...issueList, ...res.data.data]);
      setMaxPage(res.data.meta.pageCount);
    } catch (error) {
      errorHandler(error);
    } finally {
    }
  };
  useEffect(() => {
    getIssue();
  }, [pageNum]);

  return (
    <StandbyIssueContainer>
      <div>
        {issueList.map(issue => {
          return (
            <Issue issue={issue} setIssueList={setIssueList} key={issue._id} />
          );
        })}
      </div>
      {pageNum <= maxPage && (
        <PaginationButton onClick={loadMore}>더 보기</PaginationButton>
      )}
    </StandbyIssueContainer>
  );
};

export default StandbyIssue;

const StandbyIssueContainer = styled.div`
  padding: 40px 20px 70px 20px;
  position: relative;
`;
const PaginationButton = styled.button`
  background-color: ${theme.colors.lighterColor};
  border-radius: 10px;
  padding: 10px;
  margin-top: 30px;
  width: 80px;
  position: absolute;
  left: 50%;
  bottom: 3px;
  transform: translate(-50%, -50%);
`;
