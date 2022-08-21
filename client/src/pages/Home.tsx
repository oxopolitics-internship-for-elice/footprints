import Politicians from '@/components/Home/Politicians';
import ServiceInfo from '@/components/Home/ServiceInfo';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { FullPage, Slide } from 'react-full-page';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>정치 발자국</title>
      </Helmet>
      <FullPage>
        <Slide>
          <ServiceInfo />
        </Slide>
        <Slide>
          <Politicians />
        </Slide>
      </FullPage>
    </>
  );
};

export default Home;
