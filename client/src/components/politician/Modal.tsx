import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { IoCloseCircleOutline } from 'react-icons/io5';

import './model.css';
type Element = {
  $context: Object;
  x: number;
  y: number;
};
type Object = {
  dataIndex: number;
};
interface ModalProps {
  setOpen: (boolean: boolean) => void;
  element: Element;
  content: [];
}
const Modal = ({ setOpen, element, content }: ModalProps) => {
  const [poll, setPoll] = useState<any>({ pro: false, neu: false, con: false });

  const ref = useRef<null | HTMLDivElement>(null);
  const Imgsrc = ['img/circle.png', 'img/triangle.png', 'img/x.png'];

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    console.log(ref);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  }
  async function ClickHandler(index: number) {
    console.log(element, 'gds');
    let target = '6303c94fffebd001ceec6dff';

    setPoll(async () => {
      let newPoll: { pro: boolean; neu: boolean; con: boolean } = {
        pro: false,
        neu: false,
        con: false,
      };
      if (index === 0) {
        newPoll['pro'] = true;
      } else if (index === 1) {
        newPoll['neu'] = true;
      } else {
        newPoll['con'] = true;
      }
      const res = await axios.patch(
        `http://localhost:5000/issues/${target}/poll`,
        newPoll,
      );
      console.log(res);
      return newPoll;
    });
  }
  return (
    <>
      <Modal3>
        <Container {...element} ref={ref}>
          <Header ref={ref}>
            <HeaderText>gadfadtgsgs</HeaderText>
            {/* <CloseButton
              style={{}}
              onClick={() => {
                setOpen(false);
              }}
            >
              <IoCloseCircleOutline size="50" />
            </CloseButton> */}
          </Header>
          <Section>{content[element.$context.dataIndex]}</Section>
          <ChooseBox>
            {Imgsrc.map((src, index) => {
              return (
                <ChooseItem
                  key={index}
                  onClick={() => {
                    ClickHandler(index);
                  }}
                >
                  <img src={src} width="30px" />
                </ChooseItem>
              );
            })}
          </ChooseBox>
        </Container>
      </Modal3>
    </>
  );
};

export default Modal;

interface ContainerProps {
  x: number;
  y: number;
}
const Modal3 = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: fadeIn;
  animation-fill-mode: forwards;
`;
const Container = styled.div<ContainerProps>`
  width: 1000px;
  height: 700px;
  position: relative;
  top: 550px;
  right: 0px;
  bottom: 0px;
  left: 1100px;
  background-color: #fff;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: fadeIn;
  animation-fill-mode: forwards;
  transform: translate(-50%, -50%);
`;
const Section = styled.section`
  border-radius: 0.3rem;
  background-color: #fff;
  overflow: hidden;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: slideUp;
  animation-fill-mode: forwards;
`;
const CloseButton = styled.div`
  float: right;
`;
const HeaderText = styled.text`
  font-size: 35px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  width: 900px;
  padding-left: 60px;
  height: 80px;
`;
const Header = styled.div`
  text-align: center;
  position: relative;
  padding: 16px 30px 16px 0;
  background-color: #f1f1f1;
  font-weight: 700;
  height: 80px;
  over-flow: hidden;
`;
const ChooseBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 5px;
  width: 100%;
`;

const ChooseItem = styled.button`
  border: none;
  flex-grow: 1;
`;
