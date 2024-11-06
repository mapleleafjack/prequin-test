import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvestorsList from './components/InvestorsList/InvestorsList';
import Commitments from './components/Commitments/Commitments';

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<InvestorsList />} />
      <Route path="/commitments/:id" element={<Commitments />} />
    </Routes>
  </Router>
);

export default AppRouter;
