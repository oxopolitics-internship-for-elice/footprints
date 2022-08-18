import Politicians from '@/components/Home/Politicians';
import ServiceInfo from '@/components/Home/ServiceInfo';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>정치 발자국</title>
      </Helmet>
      <HomeContainer>
        <ServiceInfo />
        <Politicians />
      </HomeContainer>
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: #fff;
`;
