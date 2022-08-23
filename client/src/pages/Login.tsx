import { flexCenter } from '@/styles/flex';
import styled from '@emotion/styled';
import React from 'react';
import kakaoSymbol from '@/assets/kakaoSymbol.png';

const Login = () => {
  return (
    <>
      <Container>
        <LoginWrap>
          <h2>로그인</h2>
          <ButtonWrap>
            <KaKaoLogin>
              <a id="kakaoSignInDiv">
                <img width="25px" src={kakaoSymbol} alt="kakaoSymbol" />
                <div>Kakao로 시작하기</div>
              </a>
            </KaKaoLogin>
          </ButtonWrap>
        </LoginWrap>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100vh;
`;

const LoginWrap = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 460px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ebebeb;
`;

const ButtonWrap = styled.div`
  ${flexCenter}
  width: 100%;
  margin-top: 20px;
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
