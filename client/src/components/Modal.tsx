import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { IoCloseCircleOutline } from 'react-icons/io5';

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
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    console.log();
    console.log(content);
  });
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
  function ClickHandler(index: number) {
    console.log(index);
  }
  return (
    <>
      <Container {...element} ref={ref}>
        <CloseButton
          onClick={() => {
            setOpen(false);
          }}
        >
          <IoCloseCircleOutline />
        </CloseButton>
        {content[element.$context.dataIndex]}
        <ChooseBox>
          {Imgsrc.map((src, index) => {
            return (
              <ChooseItem
                key={index}
                onClick={() => {
                  ClickHandler(index);
                }}
              >
                <img src={src} width="20px" />
              </ChooseItem>
            );
          })}
        </ChooseBox>
      </Container>
    </>
  );
};
export default Modal;

interface ContainerProps {
  x: number;
  y: number;
}

const Container = styled.div<ContainerProps>`
  width: 300px;
  height: 200px;
  position: absolute;

  top: ${element => element.y}px;
  left: ${element => element.x}px;
  transform: translate(-50%, -50%);
  background-color: #c8c8c8;
  border: 1px solid black;
  border-radius: 8px;
  opacity: 0.8;
`;
const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-right: 10px;
`;

const ChooseBox = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 30px;
  align-items: center;
  margin: 100px 0;
`;

const ChooseItem = styled.button`
  border: none;
  flex-grow: 1;
`;
