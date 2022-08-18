import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import Layout from '@components/Layout/Layout';
import GlobalStyle from './styles/Global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <HelmetProvider>
      <Layout>
        <App />
      </Layout>
    </HelmetProvider>
  </React.StrictMode>,
);
