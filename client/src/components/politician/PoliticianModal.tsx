import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import GraphAPI from '@/api/GraphAPI';
import BasicCircle from '@/assets/selection/BasicCircle.svg';
import BasicTriangle from '@/assets/selection/BasicTriangle.svg';
import BasicX from '@/assets/selection/BasicX.svg';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { GraphIssueDataType } from '@/types/GraphTypes';
import theme from '@/styles/theme';
import { useRecoilValue } from 'recoil';
import { authTokenState } from '@/store/AuthTokenState';

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
  selectedIssueIndex: number;
  issueData: GraphIssueDataType;
}

const Modal = ({ setOpen, selectedIssueIndex, issueData }: ModalProps) => {
  const [poll, setPoll] = useState<{
    pro: boolean;
    neu: boolean;
    con: boolean;
  }>({ pro: false, neu: false, con: false });
  const isLogined = useRecoilValue(authTokenState).access_token !== '';

  const ref = useRef<null | HTMLDivElement>(null);
  const Imgsrc = [BasicCircle, BasicTriangle, BasicX];

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
      document.body.style.overflow = 'unset';
    }
  }
  async function ClickHandler(index: number) {
    const target = issueData.id[selectedIssueIndex];
    const newPoll = { pro: false, neu: false, con: false };
    if (index === 0) {
      newPoll.pro = true;
    } else if (index === 1) {
      newPoll.neu = true;
    } else {
      newPoll.con = true;
    }
    await GraphAPI.updatePoll(target, newPoll);
    setPoll(newPoll);
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
      const target = issueData.id[selectedIssueIndex];
      const { data } = await GraphAPI.getPollInfo(target);
      const pollResult = data.pollResult;
      if (pollResult) {
        setPoll(prev => {
          return { ...prev, [pollResult]: true };
        });
      }
    };
    if (isLogined) {
      fetchPollInfo();
    }
    console.log(selectedIssueIndex);
  }, []);

  return (
    <>
      <Background>
        <Container ref={ref}>
          <Header ref={ref}>
            <div />
            <HeaderText>{issueData.title[selectedIssueIndex]}</HeaderText>
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
            <ContentText>{issueData.content[selectedIssueIndex]}</ContentText>
            {/* {issueData?.link && (
              <Link href={issueData.link[selectedIssueIndex]} target="_blank">
                {issueData.link[selectedIssueIndex]}
              </Link>
            )} */}
          </Content>
          <ChooseBox>
            {Imgsrc.map((src, index) => {
              return (
                <ChooseItem
                  key={index}
                  onClick={() => {
                    ClickHandler(index);
                  }}
                  clicked={pollHandler(index) || false}
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
const Container = styled.div`
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
