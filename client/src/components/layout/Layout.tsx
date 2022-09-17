import styled from '@emotion/styled';
import FullHeightPage from '@components/system/FullHeightPage';
import { isLoginModalOpen } from '@/store/LoginModalState';
import { useRecoilValue } from 'recoil';
import GlobalLoginModal from '@/components/base/GlobalLoginModal';

export interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isloginModalOpened = useRecoilValue(isLoginModalOpen);
  return (
    <>
      <FullHeightPage>
        <Container>
          {isloginModalOpened && <GlobalLoginModal />}
          {children}
        </Container>
      </FullHeightPage>
    </>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 100%;
  margin: 0 5% 0 5%;
  display: flex;
  flex-direction: column;
`;
