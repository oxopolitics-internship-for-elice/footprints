import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StandbyIssue from './components/StandbyIssue';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/graph" element={<StandbyIssue />} />
    </Routes>
  </BrowserRouter>,
);
