import styled from '@emotion/styled';
import React from 'react';
import { removeCookie } from '@/utils/Cookie';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@components/base/Alert';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLogined, authTokenState } from '@/store/AuthTokenState';
import { loginModalState } from '@/store/LoginModalState';

const AuthButton = () => {
  // const accessToken = getCookie('access_token');
  const isLoginState = useRecoilValue(isLogined);
  const setAuthTokenState = useSetRecoilState(authTokenState);
  const navigate = useNavigate();
  const setLoginModalState = useSetRecoilState(loginModalState);

  const handleLogin = () => {
    setLoginModalState(prev => (prev = { isOpen: true }));
  };

  const handleLogout = () => {
    setAuthTokenState(prev => (prev = { access_token: '' }));
    removeCookie('access_token');
    navigate('/');
    Alert.fire({
      icon: 'success',
      title: '로그아웃 되었습니다.',
    });
  };

  return (
    <>
      {isLoginState ? (
        <Button onClick={handleLogout}>로그아웃</Button>
      ) : (
        <Button onClick={handleLogin}>로그인</Button>
      )}
    </>
  );
};

export default AuthButton;

const Button = styled.button`
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
