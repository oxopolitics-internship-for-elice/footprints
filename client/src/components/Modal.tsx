import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoCloseCircleOutline } from 'react-icons/io5';
function Modal({ setOpen, element }) {
  const ref = useRef(null);
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
  function ClickHandler(index) {
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
}
export default Modal;

const Container = styled.div`
  width: 300px;
  height: 200px;
  z-index: 999;
  position: absolute;
  top: ${element => element.y + 100}px;
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
  margin: 130px 0;
`;

const ChooseItem = styled.button`
  border: none;
  flex-grow: 1;
`;
