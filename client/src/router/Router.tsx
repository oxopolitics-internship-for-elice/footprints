import PoliticianList from '@/pages/PoliticianList';
import Home from '@/pages/Home';
import Politician from '@/pages/Politician';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/utils/ScrollToTop';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politician" element={<PoliticianList />} />
        <Route path="/politician/:politicianID" element={<Politician />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
