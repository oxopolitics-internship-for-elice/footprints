import React from 'react';
import Modal from '@/components/Base/Modal';
import styled from '@emotion/styled';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';

import 'react-datepicker/dist/react-datepicker.css';

interface IssueAddModalProps {
  modalShow: boolean;
  handleModalToggle: () => void;
}
const IssueAddModal = ({
  modalShow,
  handleModalToggle,
}: IssueAddModalProps) => {
  const [startDate, setStartDate] = React.useState(new Date());
  registerLocale('ko', ko);

  const handleChangeDate = (date: Date) => {
    if (!date) {
      setStartDate(new Date());
    }
    setStartDate(date);
  };

  return (
    <>
      {modalShow && (
        <Modal onClickToggleModal={handleModalToggle}>
          <ModalDiv>
            <ModalTitle>이슈 등록</ModalTitle>
            <ModalBody>
              <form>
                <FormGroup>
                  <FormLabel>발생 날짜</FormLabel>
                  <DatePicker
                    locale="ko"
                    showPopperArrow={false}
                    fixedHeight
                    selected={startDate}
                    onChange={handleChangeDate}
                    dateFormat="yyyy-MM-dd"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>이슈 내용</FormLabel>
                  <textarea rows={5} />
                </FormGroup>
              </form>
            </ModalBody>
          </ModalDiv>
        </Modal>
      )}
    </>
  );
};

export default IssueAddModal;

const ModalDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 20px 30px;
`;

const ModalTitle = styled.div`
  text-align: center;
  color: rgb(18, 18, 18);
  font-size: 20px;
  font-weight: 600;
  flex-shrink: 0;
  margin-bottom: 20px;
  width: 100%;
`;

const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 30px;
`;

const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 40px;
    border: 1px solid black;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 14px;
    color: rgb(18, 18, 18);
    &:focus {
      border: 1px solid rgb(18, 18, 18);
      outline: none;
    }
  }
`;

const FormLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 400;
  color: rgb(18, 18, 18);
  margin-bottom: 0.5rem;
`;
