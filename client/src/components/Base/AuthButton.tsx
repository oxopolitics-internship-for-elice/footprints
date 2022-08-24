import styled from '@emotion/styled';
import React from 'react';
import { getCookie, removeCookie } from '@/utils/Cookie';
import { useNavigate } from 'react-router-dom';

const AuthButton = () => {
  const accessToken = getCookie('accessToken');
  const navigate = useNavigate();
  // 쿠키로 분기 하는 것이 아닌 store의 유저정보로 분기해야함
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
