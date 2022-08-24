import StandbyIssue from '@components/politician/StandbyIssue';
import Top3Issue from '@components/politician/Top3Issue';

const Politician = (): JSX.Element => {
  return (
    <>
      <Top3Issue />
      <StandbyIssue />
    </>
  );
};

export default Politician;
