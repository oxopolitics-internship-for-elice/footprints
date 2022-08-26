import styled from '@emotion/styled';
import { IssueProps } from '@components/politician/StandbyIssue';
import { IssueTypes } from '@/types/IssueTypes';
import dateFormatter from '@/utils/DateFormatter';
import * as Api from '@/api/Api';

const Issue = ({ issue, setIssueList }: IssueProps): JSX.Element => {
  const { _id, issueDate, content, regi } = issue;
  let issuedDate = dateFormatter(issueDate);

  const regiHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElem = e.target as HTMLButtonElement;
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
            console.log(res);
          } else {
            issue.regi.pro += 1;
            const res = await Api.patch(`issues/${_id}/regi`, {
              pro: true,
              con: false,
            });
            console.log(res);
          }
        }
      });
      return prevIssueList;
    });
  };

  return (
    <IssueContainer>
      <span>{`찬성 ${regi.pro}`}</span>
      <span>{`반대 ${regi.con}`}</span>
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
