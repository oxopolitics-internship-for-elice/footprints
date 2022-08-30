import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';
import HashLoader from 'react-spinners/HashLoader';

const override: CSSProperties = {
  borderRadius: `50%`,
  padding: `50px`,
};

const Loading = () => {
  return (
    <Div>
      <HashLoader size={70} cssOverride={override} color={'white'} />
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Loading;
