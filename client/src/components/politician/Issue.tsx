import styled from '@emotion/styled';
import { IssueProps } from '@components/politician/StandbyIssue';
import { IssueTypes } from '@/types/IssueTypes';
import dateFormatter from '@/utils/DateFormatter';
import * as Api from '@/api/Api';
import theme from '@/styles/theme';
import { useState } from 'react';

const Issue = ({ issue, setIssueList }: IssueProps): JSX.Element => {
  const { _id, issueDate, content, regi } = issue;
  const issuedDate = dateFormatter(issueDate);
  const [toggle, setToggle] = useState('');

  const regiHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElem = e.target as HTMLButtonElement;
    setToggle(targetElem.innerText);
    setIssueList((prev: any): IssueTypes[] => {
      const prevIssueList: IssueTypes[] = JSON.parse(JSON.stringify(prev));
      prevIssueList.forEach(async issue => {
        if (issue._id === targetElem.dataset.id) {
          if (targetElem.innerText === '반대') {
            issue.regi.con += 1;
            const res = await Api.patch(`issues/${_id}/regi`, {
              pro: false,
              con: true,
            });
          } else {
            issue.regi.pro += 1;
            const res = await Api.patch(`issues/${_id}/regi`, {
              pro: true,
              con: false,
            });
          }
        }
      });
      return prevIssueList;
    });
  };

  return (
    <IssueContainer>
      <SubContainer>
        <Date>{issuedDate}</Date>
        <div>
          <BolderSpan>찬성</BolderSpan> {`${regi.pro} ∙ `}
          <BolderSpan>반대</BolderSpan> {`${regi.con}`}
        </div>
      </SubContainer>
      <Content>{content}</Content>

      <RegiProButton
        data-id={_id}
        toggle={toggle === '찬성' ? true : false}
        onClick={regiHandler}
      >
        찬성
      </RegiProButton>
      <RegiConButton
        data-id={_id}
        toggle={toggle === '반대' ? true : false}
        onClick={regiHandler}
      >
        반대
      </RegiConButton>
    </IssueContainer>
  );
};

export default Issue;

const IssueContainer = styled.article`
  border: ${theme.colors.mainColor} 1px solid;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex-column;
`;
const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Date = styled.div`
  color: ${theme.colors.thirdColor};
  font-size: 12px;
`;
const BolderSpan = styled.span`
  font-weight: bolder;
`;
const Content = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 27.2px;
  padding: 20px 0 20px 0;
`;
type ButtonProps = {
  toggle: boolean;
};
const RegiProButton = styled.button<ButtonProps>`
  background-color: ${props =>
    props.toggle ? `${theme.colors.subColor}` : `${theme.colors.mainColor}`};
  color: ${props => (props.toggle ? 'white' : 'black')};
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  padding: 10px 30px 10px 30px;
`;
const RegiConButton = styled.button<ButtonProps>`
  background-color: ${props =>
    props.toggle ? `${theme.colors.subColor}` : `${theme.colors.mainColor}`};
  color: ${props => (props.toggle ? 'white' : 'black')};
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  padding: 10px 30px 10px 30px;
`;
