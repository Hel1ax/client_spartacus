import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
    </Router>
  );
};

export default App;
