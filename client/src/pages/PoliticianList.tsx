import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/base/Header';

const PoliticianList = () => {
  return (
    <>
      <Helmet>
        <title>정치인 목록</title>
      </Helmet>
      <Header />
      <div>정치인 목록</div>
    </>
  );
};

export default PoliticianList;
