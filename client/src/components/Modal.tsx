import { useEffect, useRef } from 'react';
import styled from 'styled-components';
function Modal({ setOpen }) {
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
      <Container ref={ref}>
        <CloseButton>X</CloseButton>
        <p>모달창입니다.</p>
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
  top: 400px;
  left: 405px;
  transform: translate(-50%, -50%);
  background-color: red;
  border: 1px solid black;
  border-radius: 8px;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;
