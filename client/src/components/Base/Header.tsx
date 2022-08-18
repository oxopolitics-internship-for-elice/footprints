import styled from '@emotion/styled';
import React from 'react';

const Header = () => {
  return (
    <>
      <Block>Header</Block>
    </>
  );
};

export default Header;

const Block = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid '#ECECEC';
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
