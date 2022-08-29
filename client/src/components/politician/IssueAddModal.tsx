import React from 'react';
import Modal from '@/components/Base/Modal';
import styled from '@emotion/styled';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import dateFormatter from '@/utils/DateFormatter';

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
  const [issueTitle, setIssueTitle] = React.useState('');
  const [issueContent, setIssueContent] = React.useState('');
  registerLocale('ko', ko);

  const handleChangeDate = (date: Date) => {
    if (!date) {
      setStartDate(new Date());
    }
    setStartDate(date);
  };

  const handleIssueSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(startDate);
    console.log(issueTitle);
    console.log(issueContent);
  };

  return (
    <>
      {modalShow && (
        <Modal onClickToggleModal={handleModalToggle}>
          <ModalDiv>
            <ModalTitle>이슈 등록</ModalTitle>
            <ModalBody>
              <form onSubmit={handleIssueSubmit}>
                <FormGroup>
                  <FormLabel>발생 날짜</FormLabel>
                  <DatePicker
                    locale="ko"
                    showPopperArrow={false}
                    fixedHeight
                    selected={startDate}
                    onChange={handleChangeDate}
                    dateFormat="yyyy-MM-dd"
                    disabledKeyboardNavigation
                    maxDate={new Date()}
                    popperPlacement="bottom"
                    id="issue-date"
                    placeholderText="YYYY-MM-DD"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>이슈 제목</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="이슈 제목을 20자 내로 입력해주세요"
                    value={issueTitle}
                    onChange={event => setIssueTitle(event.target.value)}
                    maxLength={20}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>이슈 내용</FormLabel>
                  <FormTextArea
                    name="content"
                    rows={1}
                    placeholder="이슈 내용을 100자 내로 입력해주세요."
                    maxLength={100}
                    value={issueContent}
                    onChange={event => setIssueContent(event.target.value)}
                  />
                </FormGroup>
                <FormSubmit type="submit">등록</FormSubmit>
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
  #issue-date {
    width: 100%;
    height: 40px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 15px;
    padding: 20px;
    font-size: 16px;
    color: rgb(18, 18, 18);
  }
`;

const FormInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 15px;
  padding: 20px;
  font-size: 16px;
  color: rgb(97, 97, 97);
  line-height: 160%;
  overflow: hidden;
`;

const FormTextArea = styled.textarea`
  padding: 20px;
  width: 100%;
  height: 156px;
  color: rgb(97, 97, 97);
  resize: none;
  font-size: 16px;
  line-height: 160%;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  border-radius: 15px;
  overflow: hidden;
`;

const FormLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 400;
  color: rgb(18, 18, 18);
  margin-bottom: 0.5rem;
`;

const FormSubmit = styled.button`
  background-color: rgb(47, 47, 47);
  color: white;
  font-weight: bold;
  border-radius: 15px;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: 0 0 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;
