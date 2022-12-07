import styled from '@emotion/styled';
import React from 'react';
import { getCookie, removeCookie } from '@/utils/Cookie';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@components/base/Alert';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authTokenState, AuthTokenState } from '@/store/AuthTokenState';
import { loginModalState, LoginModalState } from '@/store/LoginModalState';

const AuthButton = () => {
  const accessToken = getCookie('access_token');
  const isLogin = useRecoilValue(authTokenState).access_token !== '';
  const setAuthTokenState = useSetRecoilState(authTokenState);
  const navigate = useNavigate();
  const setLoginModalState = useSetRecoilState(loginModalState);

  const handleLogin = () => {
    setLoginModalState((prev: LoginModalState) => {
      return {
        ...prev,
        isOpen: true,
      };
    });
  };

  const handleLogout = () => {
    setAuthTokenState((prev: AuthTokenState) => {
      return {
        ...prev,
        access_token: '',
      };
    });
    removeCookie('access_token');
    navigate('/');
    Alert.fire({
      icon: 'success',
      title: '로그아웃 되었습니다.',
    });
  };

  return (
    <>
      {isLogin || accessToken ? (
        <Button onClick={handleLogout}>로그아웃</Button>
      ) : (
        <Button onClick={handleLogin}>로그인</Button>
      )}
    </>
  );
};

export default AuthButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #000;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 40px;
  &:hover {
    color: ${({ theme }) => theme.colors.subColor};
  }
`;
