import styled from '@emotion/styled';
import laptop from '@/assets/laptop.jpg';
import carousel1 from '@/assets/carousel1.png';
import { HiArrowSmRight } from 'react-icons/hi';

const ServiceIntro = (): JSX.Element => {
  return (
    <>
      <Content>
        <h2>정치인의 발자취를 평가해보세요</h2>
        <p>
          정치 발자국에서는 유저들이 정치 이슈를 등록하고
          <br />
          투표로 발자국에 참여할 수 있습니다.
        </p>
        <button>무료로 시작하기</button>
        <ImageContainer>
          <CarouselContainer></CarouselContainer>
        </ImageContainer>
      </Content>
    </>
  );
};

export default ServiceIntro;

const Content = styled.div`
  padding-top: 120px;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    letter-spacing: -1.5px;
    font-weight: 800;
    text-align: center;
  }
  p {
    font-size: 1.5rem;
    line-height: 3rem;
    letter-spacing: -0.75px;
    font-weight: 400;
    text-align: center;
  }
  button {
    width: 170px;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: none;
    background-color: ${({ theme }) => theme.colors.subColor};
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
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
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
  display: flex;
  justify-content: center;
  padding-top: 5.25%;
`;

const CarouselContainer = styled.div`
  width: 41%;
  height: 58%;
  margin: 4% auto;
  background: url(${carousel1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
