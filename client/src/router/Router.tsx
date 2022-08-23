import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Graph from '@/pages/Graph';
import Politician from '@/pages/Politician';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/politician" element={<Politician />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
