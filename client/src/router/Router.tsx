import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Politician from '@/pages/Politician';
import ScrollToTop from '@/utils/ScrollToTop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politician/:politicianID" element={<Politician />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default Router;
