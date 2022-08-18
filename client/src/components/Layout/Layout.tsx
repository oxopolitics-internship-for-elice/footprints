import { flexCenter } from '@/styles/flex';
import styled from '@emotion/styled';
import Header from '../Base/Header';
import FullHeightPage from '../System/FullHeightPage';
import { LayoutProps } from './types';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <FullHeightPage>
        <Header />
        <Container>{children}</Container>
      </FullHeightPage>
    </>
  );
};

export default Layout;

const Container = styled.div`
  ${flexCenter}
  max-width: 100%;
  margin: 8rem 5% 0 5%;
`;
