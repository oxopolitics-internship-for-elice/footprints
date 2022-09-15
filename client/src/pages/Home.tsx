import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/base/Header';
import SlideFullPage from '@/components/home/SlideFullPage';
import { setCookie } from '@/utils/Cookie';
import { useSetRecoilState } from 'recoil';
import { authTokenState } from '@/store/AuthTokenState';

const Home = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const setAuthTokenState = useSetRecoilState(authTokenState);

  const handleLogin = () => {
    const { access, refresh } = params;
    if (access && refresh) {
      setCookie('access_token', access, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      });
      setCookie('refresh_token', refresh, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      });
      setAuthTokenState(prev => (prev = { access_token: access }));
    }
  };

  React.useEffect(() => {
    handleLogin();
  }, []);

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
