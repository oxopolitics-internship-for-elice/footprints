import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Base/Header';
import SlideFullPage from '@/components/Home/SlideFullPage';

const Home = () => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>정치 발자국</title>
      </Helmet>
      <Header />
      <SlideFullPage />
    </>
  );
};

export default Home;
