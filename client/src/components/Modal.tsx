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

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
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
        <div>
          <p>모달창입니다.</p>
        </div>
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
  background-color: #f8f8f8;
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
