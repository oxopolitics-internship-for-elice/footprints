import DrowGraph from '../components/GraphCompoenet';
import { Helmet } from 'react-helmet-async';

const Graph = () => {
  return (
    <>
      <Helmet>
        <title>정치인 상세페이지</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '100px',
        }}
      >
        <DrowGraph />
      </div>
    </>
  );
};

export default Graph;
