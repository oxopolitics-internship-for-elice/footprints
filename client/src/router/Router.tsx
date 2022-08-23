import Home from '@/pages/Home';
import Politician from '@/pages/Politician';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/politician" element={<Politician />} />
    </Routes>
  );
};

export default Router;
