import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import Layout from '@components/Layout/Layout';
import GlobalStyle from './styles/Global';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <HelmetProvider>
        <Layout>
          <App />
        </Layout>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
