import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IoCloseCircleOutline } from 'react-icons/io5';
import GraphAPI from '@/api/GraphAPI';
import * as API from '@/api/Api';
import axios from 'axios';

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

const PoliticianModal = ({ setOpen, element, content }: ModalProps) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [poll, setPoll] = useState<any>({ pro: false, neu: false, con: false });

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  }
  const Imgsrc = ['img/circle.png', 'img/triangle.png', 'img/x.png'];
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
      <Container {...element} ref={ref}>
        <CloseButton
          onClick={() => {
            setOpen(false);
          }}
        >
          <IoCloseCircleOutline size="50" />
        </CloseButton>

        <ContentDiv>{content[element.$context.dataIndex]}</ContentDiv>
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
    </>
  );
};
export default PoliticianModal;

interface ContainerProps {
  x: number;
  y: number;
}

const Container = styled.div<ContainerProps>`
  width: 500px;
  height: 300px;
  position: absolute;

  top: ${element => element.y + 150}px;
  left: ${element => element.x}px;
  transform: translate(-50%, -50%);
  background-color: #c8c8c8;
  border: 1px solid black;
  opacity: 0.8;
`;
const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-right: 10px;
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
`;
const ChooseBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const ChooseItem = styled.button`
  border: none;
  flex-grow: 1;
`;
