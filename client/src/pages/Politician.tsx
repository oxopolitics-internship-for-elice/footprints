import StandbyIssue from '@components/StandbyIssue';
import Top3Issue from '@components/Top3Issue';

const Politician = (): JSX.Element => {
  return (
    <>
      <Top3Issue />
      <StandbyIssue />
    </>
  );
};

export default Politician;
