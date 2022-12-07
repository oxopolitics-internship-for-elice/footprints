import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import 'animate.css/animate.min.css';
import App from './App';
import GlobalStyle from '@/styles/Global';
import theme from '@/styles/theme';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@emotion/react';
import Layout from '@/components/layout/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <GlobalStyle />
      <HelmetProvider>
        <CookiesProvider>
          <Layout>
            <App />
          </Layout>
        </CookiesProvider>
      </HelmetProvider>
    </RecoilRoot>
  </ThemeProvider>,
);
