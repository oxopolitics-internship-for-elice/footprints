import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import GraphAPI from '@/api/GraphAPI';
import Circle from '@/assets/img/circle.png';
import Triangle from '@/assets/img/triangle.png';
import X from '@/assets/img/x.png';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { ResDataTypes } from '@/types/GraphTypes';
import errorHandler from '@/api/ErrorHandler';
import theme from '@/styles/theme';
import { getCookie } from '@/utils/Cookie';

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
  const accessToken = getCookie('access_token');

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
    let newPoll = {};
    switch (index) {
      case 0:
        newPoll = { pro: true, neu: false, con: false };
        break;
      case 1:
        newPoll = { pro: false, neu: true, con: false };
        break;
      case 2:
        newPoll = { pro: false, neu: false, con: true };
        break;
    }
    try {
      const { data } = await GraphAPI.updatePoll(target, newPoll);
      if (data.before) {
        setPoll((prev: any) => {
          return {
            ...prev,
            [data.before]: false,
          };
        });
      }
      if (data.now) {
        setPoll((prev: any) => {
          return {
            ...prev,
            [data.now]: true,
          };
        });
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }

  const pollHandler = (index: number) => {
    const { pro, neu, con } = poll;
    if (index === 0) {
      return pro;
    }
    if (index === 1) {
      return neu;
    }
    if (index === 2) {
      return con;
    }
  };

  useEffect(() => {
    const fetchPollInfo = async () => {
      const target = resData.id[element.$context.dataIndex];
      const { data } = await GraphAPI.getPollInfo(target);
      const pollResult = data.pollResult;
      if (pollResult) {
        setPoll((prev: any) => {
          return { ...prev, [pollResult]: true };
        });
      }
    };
    if (accessToken) {
      fetchPollInfo();
    }
    console.log(resData);
  }, []);

  return (
    <>
      <Background>
        <Container {...element} ref={ref}>
          <Header ref={ref}>
            <HeaderText>
              {resData.title[element.$context.dataIndex]}
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
          <Content>
            <ContentText>
              {resData.content[element.$context.dataIndex]}
            </ContentText>
            {resData?.link && (
              <Link
                href={resData.link[element.$context.dataIndex]}
                target="_blank"
              >
                {resData.link[element.$context.dataIndex]}
              </Link>
            )}
          </Content>
          <ChooseBox>
            {Imgsrc.map((src, index) => {
              return (
                <ChooseItem
                  key={index}
                  onClick={() => {
                    ClickHandler(index);
                  }}
                  clicked={pollHandler(index)}
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
  z-index: 1000;
`;
const Container = styled.div<ContainerProps>`
  width: 600px;
  height: 400px;
  position: relative;
  top: 550px;
  right: 0px;
  bottom: 0px;
  left: 50%;
  border-radius: 20px;
  background-color: #fff;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: fadeIn;
  animation-fill-mode: forwards;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;
const Content = styled.div`
  text-align: center;
  margin-top: 30px;
  background-color: #fff;
  font-size: 30px;
  overflow: hidden;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: slideUp;
  animation-fill-mode: forwards;
  min-height: 250px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  padding: 20px 20px 20px 20px;
  max-height: 500px;
  overflow: auto;
`;
const ContentText = styled.div`
  font-size: 20px;
  height: 100%;
  overflow: hidden;
  display: flex;
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

const Link = styled.a`
  color: ${theme.colors.mainColor};
  font-size: 14px;
  text-decoration: underline;
`;

interface ChooseItemProps {
  clicked: boolean;
}

const ChooseItem = styled.button<ChooseItemProps>`
  border: none;
  height: 100%;
  flex-grow: 1;
  background-color: ${props =>
    props.clicked ? props.theme.colors.mainColor : '#fff'};
  &:hover {
    color: white;
    background-color: #868387;
  }
`;
