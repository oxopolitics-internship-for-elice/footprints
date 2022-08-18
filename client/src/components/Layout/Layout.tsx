import { flexCenter } from '@/styles/flex';
import styled from '@emotion/styled';
import Header from '../Base/Header';
import { LayoutProps } from './types';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;

const Container = styled.div`
  ${flexCenter}
  max-width: 100%;
  margin: 8rem 5% 0 5%;
`;
