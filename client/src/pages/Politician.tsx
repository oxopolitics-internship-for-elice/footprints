import DrowGraph from '../components/GraphCompoenet';
import { Helmet } from 'react-helmet-async';
import StandbyIssue from '@components/politician/StandbyIssue';
import Top3Issue from '@components/politician/Top3Issue';
const Politician = (): JSX.Element => {
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
      <Top3Issue />
      <StandbyIssue />
    </>
  );
};

export default Politician;
