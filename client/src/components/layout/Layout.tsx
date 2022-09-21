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
  max-width: 1280px;
  min-width: 700px;
  display: flex;
  flex-direction: column;
`;
