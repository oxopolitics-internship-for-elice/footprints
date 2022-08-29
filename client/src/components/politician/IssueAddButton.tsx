import React, { useState } from 'react';
import styled from '@emotion/styled';
import { HiPlus } from 'react-icons/hi';
import Modal from '../Base/Modal';

interface IssueAddButtonProps {
  onClickToggleModal: () => void;
}

const IssueAddButton = ({ onClickToggleModal }: IssueAddButtonProps) => {
  return (
    <>
      <Div>
        <button onClick={onClickToggleModal}>
          <HiPlus size={22} />
          <span>이슈 추가하기</span>
        </button>
      </Div>
    </>
  );
};

export default IssueAddButton;

const Div = styled.div`
  position: fixed;
  bottom: 5%;
  right: 3%;
  background: none;
  z-index: 999;
  button {
    background: grey;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.7vw;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
    &:hover {
      background: white;
      color: black;
    }
    span {
      margin-left: 0.5vw;
      font-size: 1.2vw;
    }
  }
`;
