import React from 'react';
import styled from '@emotion/styled';
import { HiPlus } from 'react-icons/hi';
import theme from '@/styles/theme';

interface IssueAddButtonProps {
  onClickToggleModal: () => void;
}

const IssueAddButton = ({ onClickToggleModal }: IssueAddButtonProps) => {
  return (
    <>
      <Div>
        <button onClick={onClickToggleModal}>
          <HiPlus size={45} />
        </button>
      </Div>
    </>
  );
};

export default IssueAddButton;

const Div = styled.div`
  position: sticky;
  width: 50px;
  height: 50px;
  bottom: 20px;
  margin-right: -100px;
  background: none;
  z-index: 999;
  align-self: flex-end;
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
    box-shadow: rgba(0, 0, 0, 0.25) 3px 3px 4px;
    &:hover {
      background: ${theme.colors.mainColor};
    }
    span {
      margin-left: 0.5vw;
      font-size: 1.2rem;
    }
  }
`;
