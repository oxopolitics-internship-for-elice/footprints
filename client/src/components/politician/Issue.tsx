import styled from '@emotion/styled';
import { IssueProps } from '@components/politician/StandbyIssue';
import { IssueTypes } from '@/types/IssueTypes';
import dateFormatter from '@/utils/DateFormatter';

const Issue = ({ issue, setIssueList }: IssueProps): JSX.Element => {
  const { _id, issueDate, content, regi } = issue;
  let issuedDate = dateFormatter(issueDate);

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

  return (
    <IssueContainer>
      <div>{regi.pro - regi.con}/100</div>
      <div>{issuedDate}</div>
      <div>{content}</div>
      <button data-id={_id} onClick={regiHandler}>
        찬성
      </button>
      <button data-id={_id} onClick={regiHandler}>
        반대
      </button>
    </IssueContainer>
  );
};

export default Issue;

const IssueContainer = styled.article`
  border: grey 1px solid;
  border-radius: 2px;
  padding: 20px;
`;
