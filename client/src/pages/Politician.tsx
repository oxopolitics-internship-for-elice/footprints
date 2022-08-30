import React from 'react';
import { Helmet } from 'react-helmet-async';
import StandbyIssue from '@components/politician/StandbyIssue';
import Top3Issue from '@components/politician/Top3Issue';
import IssueAddButton from '@/components/politician/IssueAddButton';
import IssueAddModal from '@/components/politician/IssueAddModal';
import Header from '@/components/Base/Header';
import PoliticianGraph from '@/components/politician/PoliticianGraph';

const Politician = (): JSX.Element => {
  const [modalShow, setModalShow] = React.useState(false);

  const handleModalToggle = () => {
    setModalShow(prev => !prev);
  };

  return (
    <>
      <Helmet>
        <title>정치인 상세페이지</title>
      </Helmet>
      <Header />
      <PoliticianGraph />
      <IssueAddModal
        modalShow={modalShow}
        handleModalToggle={handleModalToggle}
      />
      <Top3Issue />
      <StandbyIssue />
      {!modalShow && <IssueAddButton onClickToggleModal={handleModalToggle} />}
    </>
  );
};

export default Politician;
