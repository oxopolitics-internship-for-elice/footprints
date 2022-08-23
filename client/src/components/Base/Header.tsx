import styled from '@emotion/styled';
import React from 'react';
import { Location, useNavigate } from 'react-router-dom';
import AuthButton from './AuthButton';

interface HeaderProps {
  location: Location;
}

const Header = ({ location }: HeaderProps) => {
  const navigate = useNavigate();
  const [isMainFirstPage, setIsMainFirstPage] = React.useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 925 && location.pathname === '/') {
      setIsMainFirstPage(false);
    } else {
      setIsMainFirstPage(true);
    }
  };

  const handleClickTitle = () => {
    if (isMainFirstPage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      navigate('/');
    }
  };

  React.useEffect(() => {
    if (location.pathname === '/') {
      setIsMainFirstPage(true);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    if (location.pathname !== '/') {
      setIsMainFirstPage(false);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.pathname === '/') {
      setIsMainFirstPage(true);
    } else {
      setIsMainFirstPage(false);
    }
  }, []);

  return (
    <>
      <HeaderBlock>
        <InnerHeader>
          <Title fontWhite={isMainFirstPage} onClick={handleClickTitle}>
            정치 발자국
          </Title>
          <AuthContainer>
            <AuthButton />
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
  cursor: pointer;
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;
