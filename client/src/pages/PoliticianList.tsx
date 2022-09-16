import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/base/Header';
import PoliticianBoard from '@/components/politicianList/PoliticianBoard';

const PoliticianList = () => {
  return (
    <>
      <Helmet>
        <title>정치인 목록</title>
      </Helmet>
      <Header />
      <PoliticianBoard />
    </>
  );
};

export default PoliticianList;
