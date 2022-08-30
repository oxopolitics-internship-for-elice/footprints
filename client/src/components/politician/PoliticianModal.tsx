import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import GraphAPI from '@/api/GraphAPI';
import Circle from '@/assets/img/circle.png';
import Triangle from '@/assets/img/triangle.png';
import X from '@/assets/img/x.png';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { ResDataTypes, ResTypes } from './PoliticianGraph';
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
  contentId: [];
  issueDate: [];
  resData: ResDataTypes;
}
const Modal = ({
  setOpen,
  element,
  content,
  issueDate,
  resData,
}: ModalProps) => {
  const [poll, setPoll] = useState<any>({ pro: false, neu: false, con: false });

  const ref = useRef<null | HTMLDivElement>(null);
  const Imgsrc = [Circle, Triangle, X];

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
      document.body.style.overflow = 'unset';
    }
  }
  async function ClickHandler(index: number) {
    let target = resData.id[element.$context.dataIndex];

    setPoll(async () => {
      let newPoll: { pro: boolean; neu: boolean; con: boolean } = {
        pro: false,
        neu: false,
        con: false,
      };
      console.log(resData);
      try {
        if (index === 0) {
          newPoll = { pro: true, neu: false, con: false };
        }
        if (index === 1) {
          newPoll = { pro: false, neu: true, con: false };
        }
        if (index === 2) {
          newPoll = { pro: false, neu: false, con: true };
        }
        console.log(newPoll);
        const res = await GraphAPI.updatePoll(target, newPoll);
        console.log(res.status);
        if (res.status === 200) {
          if (index === 0) {
            resData.poll[element.$context.dataIndex].pro += 1;
            newPoll['pro'] = true;
          } else if (index === 1) {
            resData.poll[element.$context.dataIndex].neu += 1;
            newPoll['neu'] = true;
          } else {
            resData.poll[element.$context.dataIndex].con += 1;
            newPoll['con'] = true;
          }
        }
      } catch (err) {}

      return newPoll;
    });
  }
  return (
    <>
      <Background>
        <Container {...element} ref={ref}>
          <Header ref={ref}>
            <HeaderText>
              {issueDate[element.$context.dataIndex]}
              <CloseButton
                style={{}}
                onClick={() => {
                  setOpen(false);
                  document.body.style.overflow = 'unset';
                }}
              >
                <IoCloseCircleOutline size="50" />
              </CloseButton>
            </HeaderText>
          </Header>
          <Content>{content[element.$context.dataIndex]}</Content>
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
      </Background>
    </>
  );
};

export default Modal;

interface ContainerProps {
  x: number;
  y: number;
}
const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(103, 97, 104, 0.5);
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
const Content = styled.div`
  text-align: center;
  line-height: 300px;
  background-color: #fff;
  font-size: 40px;
  overflow: hidden;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: slideUp;
  animation-fill-mode: forwards;
`;

const HeaderText = styled.div`
  font-size: 45px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 10px;
  display: block;
  height: 80px;
`;
const CloseButton = styled.div`
  float: right;
`;
const Header = styled.div`
  text-align: center;
  position: relative;
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
  bottom: 0px;
  width: 100%;
  background-color: #dedcdc;
  border-radius: 5px;
  height: 80px;
`;

const ChooseItem = styled.button`
  border: none;
  height: 100%;
  flex-grow: 1;
  &:hover {
    color: white;
    background-color: #868387;
  }
`;
