import WholeGraph from '@/components/home/wholeGraph';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>정치 발자국</title>
      </Helmet>
      <WholeGraph target="2f4943859883bf9a3fa30b9d" />
    </>
  );
};

export default Home;
