import styled from '@emotion/styled';
import React from 'react';
import laptop from '@/assets/laptop.jpg';
import carousel1 from '@/assets/carousel1.png';

const ServiceIntro = () => {
  return (
    <>
      <Content>
        <h2>{'정치인의 발자국을 직접 남겨보세요!'}</h2>
        <p>
          {
            '정치 발자국에서는 유저들이 정치 이슈를 등록하고 투표로 발자국에 참여할 수 있습니다.'
          }
        </p>
        <button>{'무료로 시작하기'}</button>
        <ImageContainer>
          <CarouselContainer></CarouselContainer>
        </ImageContainer>
      </Content>
    </>
  );
};

export default ServiceIntro;

const Content = styled.div`
  display: grid;
  grid-row-gap: 6px;
  padding-top: 80px;
  margin: 0px auto 0px auto;
  width: 100%;
  max-width: 1400px;
  min-width: 1200px;
  text-align: center;

  h2 {
    font-size: 3rem;
    letter-spacing: -1.5px;
    font-weight: 800;
    text-align: center;
  }
  p {
    font-size: 1.5rem;
    line-height: 3.6rem;
    letter-spacing: -0.75px;
    font-weight: 400;
    text-align: center;
  }
  button {
    width: 200px;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: none;
    background-color: ${({ theme }) => theme.colors.subColor};
    color: white;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
    justify-self: center;

    &:hover {
      color: ${({ theme }) => theme.colors.subColor};
      background-color: white;
      border: 3px solid ${({ theme }) => theme.colors.subColor};
    }
  }
`;

const ImageContainer = styled.div`
  background: url(${laptop});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 600px;
  margin: 0px auto 0px auto;
  max-width: 1400px;
  min-width: 1200px;
  display: flex;
  justify-content: center;
  padding-top: 5.25%;
`;

const CarouselContainer = styled.div`
  width: 600px;
  height: 363px;
  margin: 0px auto 0px auto;
  background: url(${carousel1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
