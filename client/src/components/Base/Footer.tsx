import styled from '@emotion/styled';
import React from 'react';

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <div>Footer</div>
      </StyledFooter>
    </>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  height: 56px;
  border-top: 1px solid '#ECECEC';
  display: flex;
`;
