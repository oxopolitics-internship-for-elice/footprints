import React from 'react';
import { Global, css } from '@emotion/react';
import reset from 'emotion-reset';
import theme from './theme';

const styles = css`
  ${reset}
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  input,
  textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
    font-family: inherit;
  }
  input:focus {
    outline: none;
  }
  textarea:focus {
    outline: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 20px;
  }
`;

const GlobalStyle = () => {
  return (
    <>
      <Global styles={styles} />
    </>
  );
};

export default GlobalStyle;
