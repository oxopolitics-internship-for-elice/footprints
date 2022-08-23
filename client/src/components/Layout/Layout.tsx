import { flexCenter } from '@/styles/flex';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import Header from '../Base/Header';
import FullHeightPage from '../System/FullHeightPage';

export interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  return (
    <>
      <FullHeightPage>
        <Header location={location} />
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
