import HomePolitician from '@/components/Home/HomePolitician';
import ServiceInfo from '@/components/Home/ServiceInfo';
import { Helmet } from 'react-helmet-async';
import { FullPage, Slide } from 'react-full-page';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Base/Header';
import HomePoliticianList from '@/components/Home/HomePoliticanList';

const Home = () => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>정치 발자국</title>
      </Helmet>
      <Header />
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
        <HomePoliticianList />
      </FullPage>
    </>
  );
};

export default Home;
