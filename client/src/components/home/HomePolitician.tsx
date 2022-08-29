import styled from '@emotion/styled';
import { flexCenter } from '@/styles/Flex';
import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import leejaemyung from '@/assets/leejaemyung.webp';
import yoonseokyeol from '@/assets/yoonseokyeol.webp';
import LifeGraph from './LifeGraph';
import { useRecoilValue } from 'recoil';
import PoliticiansState from '@/store/PoliticiansState';
import { useNavigate } from 'react-router-dom';

interface HomePoliticianProps {
  politicanName: string;
}

type ImgSrc = { [politicanNames: string]: string };

const HomePolitician = ({ politicanName }: HomePoliticianProps) => {
  const navigate = useNavigate();
  const fetchedPoliticans = useRecoilValue(PoliticiansState);
  const imgSrc: ImgSrc = {
    이재명: leejaemyung,
    윤석열: yoonseokyeol,
  };

  const handleClickPolitician = (event: React.MouseEvent) => {
    event.preventDefault();

    navigate(`/politician/${politicanName}`);
  };

  return (
    <>
      <Container>
        <AnimationOnScroll
          animateIn="animate__fadeIn"
          animateOut="animate__fadeOut"
        >
          <Politician>
            <Row>
              <Image
                src={imgSrc[politicanName]}
                alt={politicanName}
                onClick={handleClickPolitician}
              />
              <Name onClick={handleClickPolitician}>{politicanName}</Name>
              <NavigateButton onClick={handleClickPolitician}>
                더 보기 {'>'}
              </NavigateButton>
            </Row>
            <AnimationOnScroll animateIn="animate__fadeIn" delay={500}>
              <LifeGraph issues={fetchedPoliticans[politicanName]} />
            </AnimationOnScroll>
          </Politician>
        </AnimationOnScroll>
      </Container>
    </>
  );
};

export default HomePolitician;

const Container = styled.div`
  ${flexCenter}
  max-width: 100%;
  height: 100%;
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
`;

const Name = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-left: 20px;
  width: 100%;
  font-align: center;
`;

const NavigateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 128px;
  height: 50px;
  border-radius: 5px;
  background-color: 
  border: 1px solid #000;
  color: #000;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
`;
