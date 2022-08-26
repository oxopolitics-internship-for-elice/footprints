import DrowGraph from '@components/politician/PoliticianGraph';
import { Helmet } from 'react-helmet-async';
import StandbyIssue from '@components/politician/StandbyIssue';
import Top3Issue from '@components/politician/Top3Issue';
const Politician = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>정치인 상세페이지</title>
      </Helmet>
      <DrowGraph />
      <Top3Issue />
      <StandbyIssue />
    </>
  );
};

export default Politician;
