import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import PoliticianDetailState from '@/store/PoliticianDetailState';
import { useParams } from 'react-router-dom';
import theme from '@/styles/theme';
interface Params {
  politicianID: string;
}
const PoliticianInfo = (): JSX.Element => {
  const { politicianID } = useParams<keyof Params>() as Params;
  const { name, img, party } = useRecoilValue(PoliticianDetailState).find(
    (politician: any) => politician[politicianID!],
  )[politicianID];
  return (
    <InfoContainer>
      <Image src={img} alt={name} />
      <Name>
        {name}
        <Party>{party}</Party>
      </Name>
    </InfoContainer>
  );
};

export default PoliticianInfo;
const InfoContainer = styled.div`
  display: flex;
  padding: 120px 0 0 30px;
  align-items: center;
  gap: 20px;
`;
const Image = styled.img`
  border: 1px solid #000;
  border-radius: 50%;
  height: 75px;
  width: 75px;
`;

const Name = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

const Party = styled.span`
  font-size: 15px;
  font-weight: normal;
  color: ${theme.colors.subColor};
  align-self: flex-end;
  padding-left: 10px;
`;
