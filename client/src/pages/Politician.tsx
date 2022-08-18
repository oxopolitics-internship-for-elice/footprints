import StandbyIssue from '@src/components/StandbyIssue';
import Top3Issue from '@src/components/Top3Issue';

const Politician = (): JSX.Element => {
  return (
    <>
      <Top3Issue />
      <StandbyIssue />
    </>
  );
};

export default Politician;
