import HomePolitician from '@/components/Home/HomePolitician';
import ServiceInfo from '@/components/Home/ServiceInfo';
import styled from '@emotion/styled';
import WholeGraph from '@/components/home/wholeGraph';
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
          <HomePolitician name="윤석열" />
          <WholeGraph target="2f4943859883bf9a3fa30b9d" />
        </Slide>
        <Slide>
          <HomePolitician name="이재명" />
        </Slide>
      </FullPage>
    </>
  );
};

export default Home;
