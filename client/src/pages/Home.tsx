import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/base/Header';
import SlideFullPage from '@/components/home/SlideFullPage';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>정치 발자국</title>
      </Helmet>
      <Header />
      <SlideFullPage />
    </>
  );
};

export default Home;
