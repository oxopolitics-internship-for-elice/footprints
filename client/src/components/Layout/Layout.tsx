import { flexCenter } from '@/styles/Flex';
import styled from '@emotion/styled';
import Header from '../base/Header';
import FullHeightPage from '../system/FullHeightPage';

export interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
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
