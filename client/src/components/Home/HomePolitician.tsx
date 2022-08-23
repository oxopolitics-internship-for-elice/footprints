import styled from '@emotion/styled';
import { flexCenter } from '@/styles/flex';
import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import leejaemyung from '@/assets/leejaemyung.webp';
import yoonseokyeol from '@/assets/yoonseokyeol.webp';
import WholeGraph from './WholeGraph';

interface HomePoliticianProps {
  name: '이재명' | '윤석열';
}

const HomePolitician = ({ name }: HomePoliticianProps) => {
  const image = {
    이재명: leejaemyung,
    윤석열: yoonseokyeol,
  };

  return (
    <>
      <Container>
        <AnimationOnScroll animateIn="animate__fadeIn">
          <Politician>
            <Row>
              <Image src={image[name]} alt="leejaemyung" />
              <Name>{name}</Name>
            </Row>
            <WholeGraph target={'6303bed2e9d44f884ed1d640'} />
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
  width: 1400px;
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
  width: 1400px;
  height: 500px;
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
