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
      <BackGround>
        <Ground>
          {/*content*/}
          <Content ref={ref}>
            {/*header*/}
            <Header>
              <Body>gag</Body>
            </Header>
            {/*body*/}
            <Body2>aaa</Body2>
          </Content>
        </Ground>
      </BackGround>
      <Footer>gdsgsd</Footer>
    </>
  );
}
export default Modal;

const Body = styled.h3`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
`;
const Body2 = styled.div`
  position: relative;
  padding: 1.5rem;
  flex: 1 1 auto;
`;
const BackGround = styled.div`
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  justify-content: center;
  align-items: center;
  outline: 0;
`;
const Ground = styled.div`
  position: relative;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  width: auto;
  max-width: 48rem;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  background-color: #ffffff;
  flex-direction: column;
  width: 100%;
  border-radius: 0.5rem;
  border-width: 0;
  outline: 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  padding: 1.25rem;
  justify-content: space-between;
  align-items: flex-start;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom-width: 1px;
  border-style: solid;
`;
const Footer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 40;
  background-color: #000000;
  opacity: 0.25;
`;
