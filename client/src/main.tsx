import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import 'animate.css/animate.min.css';
import App from './App';
import Layout from '@/components/layout/Layout';
import GlobalStyle from './styles/Global';
import { RecoilRoot } from 'recoil';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
