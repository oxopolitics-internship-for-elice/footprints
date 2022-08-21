import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { RecoilRoot } from 'recoil';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
