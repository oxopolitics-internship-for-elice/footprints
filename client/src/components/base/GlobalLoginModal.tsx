import { flexCenter } from '@/styles/Flex';
import styled from '@emotion/styled';
import React from 'react';
import kakaoSymbol from '@/assets/KakaoSymbol.png';
import { Helmet } from 'react-helmet-async';
import { loginModalState } from '@/store/LoginModalState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Modal from '@/components/base/Modal';

const GlobalLoginModal = () => {
  const serverURL =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000'
      : 'http://politician-footprints.site:8080';

  const setLoginModalState = useSetRecoilState(loginModalState);
  const isLoginModalOpen = useRecoilValue(loginModalState);

  const handleToggleLoginModal = () => {
    setLoginModalState(prev => (prev = { isOpen: !isLoginModalOpen.isOpen }));
  };
  return (
    <Modal onClickToggleModal={handleToggleLoginModal}>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <Container>
        <LoginWrap>
          <Title>로그인</Title>
          <ButtonWrap>
            <KaKaoLogin>
              <a id="kakaoSignInDiv" href={`${serverURL}/auth/kakao`}>
                <img width="25px" src={kakaoSymbol} alt="kakaoSymbol" />
                <div>Kakao로 시작하기</div>
              </a>
            </KaKaoLogin>
          </ButtonWrap>
        </LoginWrap>
      </Container>
    </Modal>
  );
};

export default GlobalLoginModal;

const Container = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100vh;
`;

const LoginWrap = styled.div`
  ${flexCenter}
  flex-direction: column;
  justify-content: flex-start;
  width: 460px;
  height: 230px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ebebeb;
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ButtonWrap = styled.div`
  ${flexCenter}
  width: 100%;
  margin-top: 20px;
  height: 100%;
`;

const KaKaoLogin = styled.div`
  text-align: center;
  background: #fee500;
  width: 90%;
  border-radius: 5px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: white;
    border: 1px solid #fee500;
  }
  #kakaoSignInDiv {
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    img {
      margin-left: 10px;
    }
    div {
      width: 100%;
      text-align: center;
      font-weight: bold;
      color: rgba(60, 30, 30, 1);
    }
  }
`;
