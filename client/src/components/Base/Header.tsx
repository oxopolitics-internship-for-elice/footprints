import styled from '@emotion/styled';
import React from 'react';

const Header = () => {
  const [isLogined, setIsLogined] = React.useState(false); // 로그인 전역변수 대체

  return (
    <>
      <HeaderBlock>
        <InnerHeader>
          <Title>정치 발자국</Title>
          <AuthContainer>
            {isLogined ? (
              <LogoutButon onClick={() => setIsLogined(false)}>
                로그아웃
              </LogoutButon>
            ) : (
              <LoginButton onClick={() => setIsLogined(true)}>
                로그인
              </LoginButton>
            )}
          </AuthContainer>
        </InnerHeader>
      </HeaderBlock>
    </>
  );
};

export default Header;

const HeaderBlock = styled.header`
  position: sticky;
  width: 100%;
  z-index: 50;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid rgb(230, 230, 230);
  transition: all 0.5s ease 0s;
`;

const InnerHeader = styled.section`
  position: relative;
  width: 1296px;
  height: 72px;
  padding: 19px 0;
  margin: 0 auto;
  background: #fff;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.h1`
  display: block;
  font-size: 2em;
  font-weight: bold;
  justify-self: center;
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const LoginButton = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #000;
  font-size: 0.875em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.5s ease 0s;
  &:hover {
    background: #f5f5f5;
  }
`;

const LogoutButon = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #000;
  font-size: 0.875em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.5s ease 0s;
  &:hover {
    background: #f5f5f5;
  }
`;
