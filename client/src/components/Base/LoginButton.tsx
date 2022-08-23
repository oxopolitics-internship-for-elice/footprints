import styled from '@emotion/styled';
import React from 'react';
import { accessToken, removeCookie } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <>
      {accessToken ? (
        <Button onClick={() => removeCookie('accessToken')}>로그아웃</Button>
      ) : (
        <Button onClick={() => navigate('/login')}>로그인</Button>
      )}
    </>
  );
};

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
