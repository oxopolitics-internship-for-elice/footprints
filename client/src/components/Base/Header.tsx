import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isLogined, setIsLogined] = React.useState(false); // 로그인 전역변수 대체
  const [isMainFirstPage, setIsMainFirstPage] = React.useState(true);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 925 && location.pathname === '/') {
      setIsMainFirstPage(false);
    } else {
      setIsMainFirstPage(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      <HeaderBlock>
        <InnerHeader>
          <Title fontWhite={isMainFirstPage}>정치 발자국</Title>
          <AuthContainer>
            {isLogined ? (
              <LoginButton onClick={() => setIsLogined(false)}>
                로그아웃
              </LoginButton>
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
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 300;
  background-color:transparent
  border-bottom: 1px solid rgb(230, 230, 230);
  transition: all 0.5s ease 0s;
`;

const InnerHeader = styled.section`
  position: relative;
  width: 1296px;
  height: 72px;
  padding: 19px 0;
  margin: 0 auto;
  background-color:transparent
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type TitleProps = {
  fontWhite: boolean;
};

const Title = styled.h1<TitleProps>`
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  justify-self: center;
  color: ${props => (props.fontWhite ? '#fff' : '#000')};
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
