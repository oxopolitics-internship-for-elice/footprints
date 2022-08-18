import styled from '@emotion/styled';
import React from 'react';

const ServiceInfo = () => {
  return (
    <>
      <Container>
        <Info>서비스정보</Info>
      </Container>
    </>
  );
};

export default ServiceInfo;

const Container = styled.div`
  width: 810px;
  height: 273px;
  background-color: rgb(234, 238, 241);
  overflow: hidden;
  border-radius: 15px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgb(234, 238, 241);
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;
