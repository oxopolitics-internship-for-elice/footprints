import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import GraphAPI from '@/api/GraphAPI';
import BasicCircle from '@/assets/selection/BasicCircle.svg';
import BasicTriangle from '@/assets/selection/BasicTriangle.svg';
import BasicX from '@/assets/selection/BasicX.svg';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { GraphDataType } from '@/types/GraphTypes';
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
  resData: GraphDataType;
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
  const Imgsrc = [BasicCircle, BasicTriangle, BasicX];

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
            <div />
            <HeaderText>{resData.title[element.$context.dataIndex]}</HeaderText>
            <CloseButton
              onClick={() => {
                setOpen(false);
                document.body.style.overflow = 'unset';
              }}
            >
              <IoCloseCircleOutline size="25" />
            </CloseButton>
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
                  btnType={src}
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
  overflow-y: initial !important;
  position: relative;
  top: 55vh;
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
const HeaderText = styled.div`
  font-size: 25px;
  display: flex;
  padding-right: 10px;
`;
const CloseButton = styled.div`
  cursor: pointer;
  padding: 10px 10px 0 0;
`;
const Header = styled.div`
  text-align: center;
  position: relative;
  background-color: ${theme.colors.lighterColor};
  border-radius: 20px 20px 0 0;
  font-weight: 700;
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;
const Content = styled.div`
  background-color: #fff;
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
const ChooseBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: #dedcdc;
  border-radius: 20px;
  height: 70px;
`;

const Link = styled.a`
  color: ${theme.colors.mainColor};
  font-size: 14px;
  text-decoration: underline;
`;

interface ChooseItemProps {
  clicked: boolean;
  btnType: string;
}

const ChooseItem = styled.button<ChooseItemProps>`
  border: none;
  height: 100%;
  flex-grow: 1;
  border-radius: ${({ btnType }) => {
    if (btnType.includes('BasicCircle')) {
      return '0 0 0 20px';
    } else if (btnType.includes('BasicX')) {
      return '0 0 20px 0';
    } else {
      return '0 0 0 0';
    }
  }};
  background-color: ${props =>
    props.clicked ? theme.colors.mainColor : theme.colors.lighterColor};
  &:hover {
    color: white;
    background-color: #868387;
  }
`;
