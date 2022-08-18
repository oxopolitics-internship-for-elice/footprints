import styled from '@emotion/styled';
import React from 'react';

const Politician = () => {
  return (
    <>
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          정치인목록
        </div>
      </Container>
    </>
  );
};

export default Politician;

const Container = styled.div`
  width: 810px;
  height: 1000px;
  background-color: rgb(234, 238, 241);
  overflow: hidden;
  border-radius: 15px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgb(234, 238, 241);
`;
