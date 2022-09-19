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
  padding-top: 100px;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 37px;
    letter-spacing: -1.5px;
    font-weight: 800;
  }
  p {
    font-size: 22px;
    letter-spacing: -0.75px;
    font-weight: 400;
    padding: 20px 0 10px 0;
  }
  button {
    padding: 7px 15px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: none;
    background-color: ${({ theme }) => theme.colors.subColor};
    color: white;
    font-size: 19px;
    cursor: pointer;
    justify-self: center;

    &:hover {
      background-color: ${({ theme }) => theme.colors.mainColor};
      color: white;
    }
  }
`;

const ImageContainer = styled.div`
  background: url(${laptop});
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  justify-content: center;
  padding-top: 5.25%;
`;

const CarouselContainer = styled.div`
  width: 41%;
  height: 250px;
  margin: 10px auto;
  background: url(${carousel1});
  background-size: cover;
  background-position: center;
`;
