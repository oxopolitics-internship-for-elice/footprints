import React from 'react';
import Modal from '@/components/Base/Modal';
import styled from '@emotion/styled';

interface IssueAddModalProps {
  modalShow: boolean;
  handleModalToggle: () => void;
}

const IssueAddModal = ({
  modalShow,
  handleModalToggle,
}: IssueAddModalProps) => {
  return (
    <>
      {modalShow && (
        <Modal onClickToggleModal={handleModalToggle}>
          <ModalDiv>이슈 추가</ModalDiv>
        </Modal>
      )}
    </>
  );
};

export default IssueAddModal;

const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
  z-index: 10000;
`;
