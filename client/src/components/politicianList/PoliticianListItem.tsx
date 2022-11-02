import styled from '@emotion/styled';
import { flexCenter } from '@/styles/Flex';
import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import leejaemyung from '@/assets/Leejaemyung.webp';
import yoonseokyeol from '@/assets/Yoonseokyeol.webp';
import LifeGraph from '@/components/politicianList/LifeGraph';
import { useRecoilValue } from 'recoil';
import PoliticiansState from '@/store/PoliticiansState';
import { useNavigate } from 'react-router-dom';
import { PoliticiansTypes } from '@/types/PoliticiansTypes';
import { HiChevronDoubleRight } from 'react-icons/hi';
import theme from '@/styles/theme';

interface PoliticianListItemProps {
  politicanName: string;
  politicansID: string;
}

type ImgSrc = { [politicanNames: string]: string };

const PoliticianListItem = ({
  politicanName,
  politicansID,
}: PoliticianListItemProps) => {
  const navigate = useNavigate();
  const fetchedPoliticans = useRecoilValue(PoliticiansState);
  const politican = fetchedPoliticans.find(
    (politician: PoliticiansTypes) => politician._id === politicansID,
  );

  const imgSrc: ImgSrc = {
    이재명: leejaemyung,
    윤석열: yoonseokyeol,
  };

  const handleClickPolitician = (event: React.MouseEvent) => {
    event.preventDefault();

    navigate(`/politician/${politicansID}`);
  };

  return (
    <>
      <Container>
        <AnimationOnScroll animateIn="animate__fadeIn">
          <Politician>
            <Row>
              <Image
                src={imgSrc[politicanName]}
                alt={politicanName}
                onClick={handleClickPolitician}
              />
              <Name onClick={handleClickPolitician}>{politicanName}</Name>
              <NavigateButton onClick={handleClickPolitician}>
                자세히 보기
                <HiChevronDoubleRight size="21" />
              </NavigateButton>
            </Row>
            <AnimationOnScroll animateIn="animate__fadeIn" delay={0}>
              <LifeGraph issues={politican.issues} />
              <GraphTitle>{politicanName}의 정치 인생</GraphTitle>
            </AnimationOnScroll>
          </Politician>
        </AnimationOnScroll>
      </Container>
    </>
  );
};

export default PoliticianListItem;

const Container = styled.div`
  ${flexCenter}
  max-width: 100%;
  height: 100%;
  padding: 40px 0;
  border: 3px solid ${theme.colors.mainColor};
  border-radius: 10px;
  margin: 20px 0 60px 0;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-items: center;
  justify-content: space-between;
`;

const Politician = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid rgb(230, 230, 230)
  padding: 20px;
  align-items: center;
  justify-content: ;
`;

const Image = styled.img`
  border: 1px solid #000;
  border-radius: 50%;
  height: 75px;
  width: 75px;
  margin-left: 20px;
  cursor: pointer;
`;

const Name = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-left: 20px;
  width: 100%;
  font-align: center;
  cursor: pointer;
`;

const NavigateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  color: #000;
  font-size: 1.2em;
  margin-top: 20px;
  cursor: pointer;
`;
const GraphTitle = styled.div`
  ${flexCenter};
  color: ${theme.colors.subColor};
`;
