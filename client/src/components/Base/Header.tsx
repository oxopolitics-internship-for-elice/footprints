import styled from '@emotion/styled';
import React from 'react';

const Header = () => {
  return (
    <>
      <Block>
        <Title>정치 발자국</Title>
      </Block>
    </>
  );
};

export default Header;

const Block = styled.header`
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1125px;
  width: 100%;
  height: 80px;
  transition: all 0.5s ease 0s;
  padding: 0px 50px;
  margin-bottom: 45px;
  z-index: 1000;
  border-bottom: 1px solid rgb(230, 230, 230);
  background-color: rgb(255, 255, 255);
`;

const Title = styled.section`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;
