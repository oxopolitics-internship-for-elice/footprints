import { flexCenter } from '@/styles/flex';
import styled from '@emotion/styled';
import Header from '../Base/Header';
import FullHeightPage from '../System/FullHeightPage';

export interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <FullHeightPage>
        <Container>{children}</Container>
      </FullHeightPage>
    </>
  );
};

export default Layout;

const Container = styled.div`
  ${flexCenter}
  max-width: 100%;
  margin: 0 5% 0 5%;
`;
