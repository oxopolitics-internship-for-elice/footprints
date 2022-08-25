import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Graph from '@/pages/Graph';
import Politician from '@/pages/Politician';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politician" element={<Politician />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
