import styled from '@emotion/styled';
import { IssueProps } from '@components/politician/StandbyIssue';
import dateFormatter from '@/utils/DateFormatter';
import IssueAPI from '@/api/IssueAPI';
import theme from '@/styles/theme';
import { Alert, errorAlert } from '../base/Alert';

const Issue = ({ issue, setIssueList }: IssueProps): JSX.Element => {
  const { _id, issueDate, title, content, regi, link } = issue;
  const issuedDate = dateFormatter(issueDate, '년월일');

  const regiHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElem = e.target as HTMLButtonElement;
    if (targetElem.innerText === '반대') {
      const { data } = await IssueAPI.patchRegi(_id, {
        pro: false,
        con: true,
      });
      if (data.hasVoted) {
        errorAlert('이미 투표하셨습니다.');
      } else {
        Alert.fire({
          icon: 'success',
          title: '투표되었습니다.',
        });
        setIssueList(prev =>
          prev.map(item => {
            if (item._id === _id) {
              item.regi.con++;
            }
            return item;
          }),
        );
      }
    } else {
      const { data } = await IssueAPI.patchRegi(_id, {
        pro: true,
        con: false,
      });
      if (data.hasVoted) {
        errorAlert('이미 투표하셨습니다.');
      } else {
        Alert.fire({
          icon: 'success',
          title: '투표되었습니다.',
        });
        setIssueList(prev =>
          prev.map(item => {
            if (item._id === _id) {
              item.regi.pro++;
            }
            return item;
          }),
        );
      }
    }
  };

  // const mouseDownHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   const targetElem = event.target as HTMLButtonElement;
  // };

  // const mouseUpHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };
  return (
    <IssueContainer>
      <SubContainer>
        <Date>{issuedDate}</Date>
        <div>
          <BolderSpan>찬성</BolderSpan> {`${regi.pro} ∙ `}
          <BolderSpan>반대</BolderSpan> {`${regi.con}`}
          <LighterDiv>
            {`등록까지 찬성 ${Math.max(
              75 - regi.pro,
              regi.con * 3 - regi.pro,
            )}표`}
          </LighterDiv>
        </div>
      </SubContainer>
      <Title>{title}</Title>
      <Content>{content}</Content>
      {link && (
        <Link href={link} target="_blank">
          <LinkContent>{link}</LinkContent>
        </Link>
      )}
      <RegiContainer>
        <RegiProButton data-id={_id} onClick={regiHandler}>
          찬성
        </RegiProButton>
        <RegiConButton data-id={_id} onClick={regiHandler}>
          반대
        </RegiConButton>
      </RegiContainer>
    </IssueContainer>
  );
};

export default Issue;

const IssueContainer = styled.article`
  border: ${theme.colors.mainColor} 1px solid;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Date = styled.div`
  color: ${theme.colors.thirdColor};
  font-size: 14px;
`;
const BolderSpan = styled.span`
  font-weight: bolder;
`;
const LighterDiv = styled.div`
  font-size: 12px;
  color: ${theme.colors.mainColor};
  text-align: right;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 800;
  padding-top: 5px;
`;
const Content = styled.div`
  font-size: 16px;
  padding: 5px 0 30px 0;
`;

const RegiContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RegiProButton = styled.button`
  background-color: ${theme.colors.mainColor};
  color: 'black';
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  padding: 10px 30px 10px 30px;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
  &: active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
`;
const RegiConButton = styled.button`
  background-color: ${theme.colors.mainColor};
  color: 'black';
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  padding: 10px 30px 10px 30px;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
  &: active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
`;

const Link = styled.a`
  color: ${theme.colors.mainColor};
  text-decoration: underline;
  font-size: 14px;
  padding-bottom: 10px;
`;
const LinkContent = styled.div`
  width: 100%;
  overflow-wrap: break-word;
`;
