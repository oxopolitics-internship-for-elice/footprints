import styled from '@emotion/styled';
import { flexCenter } from '@/styles/Flex';
import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import leejaemyung from '@/assets/leejaemyung.webp';
import yoonseokyeol from '@/assets/yoonseokyeol.webp';
import LifeGraph from './LifeGraph';
import issueState from '@/store/IssueState';
import { IssueTypes } from '@/types/IssueTypes';
import { useRecoilValue } from 'recoil';
import PoliticiansState from '@/store/PoliticiansState';

interface HomePoliticianProps {
  politicanName: string;
}

type ImgSrc = { [politicanNames: string]: string };
const HomePolitician = ({ politicanName }: HomePoliticianProps) => {
  const fetchedPoliticans = useRecoilValue(PoliticiansState);
  const imgSrc: ImgSrc = {
    이재명: leejaemyung,
    윤석열: yoonseokyeol,
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
              <Image src={imgSrc[politicanName]} alt={politicanName} />
              <Name>{politicanName}</Name>
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
  justify-conten
`;

const Politician = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #000;
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
`;

const Chart = styled.div`
  width: 1200px;
  height: 400px;
  border-radius: 15px;
  border: 1px solid #000;
  margin: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
