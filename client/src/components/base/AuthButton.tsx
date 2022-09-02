import styled from '@emotion/styled';
import React from 'react';
import { getCookie, removeCookie } from '@/utils/Cookie';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@components/base/Alert';

const AuthButton = () => {
  const accessToken = getCookie('access_token');
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('access_token');
    navigate('/');
    Alert.fire({
      icon: 'success',
      title: '로그아웃 되었습니다.',
    });
  };
  return (
    <>
      {accessToken ? (
        <Button onClick={handleLogout}>로그아웃</Button>
      ) : (
        <Button onClick={() => navigate('/login')}>로그인</Button>
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
