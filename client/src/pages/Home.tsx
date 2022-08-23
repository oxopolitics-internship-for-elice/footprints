import HomePolitician from '@/components/home/HomePolitician';
import ServiceInfo from '@/components/home/ServiceInfo';
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
        </Slide>
        <Slide>
          <HomePolitician name="이재명" />
        </Slide>
      </FullPage>
    </>
  );
};

export default Home;
