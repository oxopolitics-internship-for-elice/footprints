import styled from '@emotion/styled';
import { IssueProps } from '@components/politician/StandbyIssue';
import { IssueTypes } from '@/types/IssueTypes';

const Issue = ({ issue, setIssueList }: IssueProps): JSX.Element => {
  const { _id, issueDate, content, regi } = issue;
  const createdDate = new Date(issueDate);
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth() + 1;
  const date = createdDate.getDate();
  const regiDate = `${year}년 ${month >= 10 ? month : '0' + month}월 ${
    date >= 10 ? date : '0' + date
  }일`;

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
    <IssueContainer key={_id}>
      <div>{regi.pro - regi.con}/100</div>
      <div>{regiDate}</div>
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
