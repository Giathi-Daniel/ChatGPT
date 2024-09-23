import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Lockout from './components/Lockout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactUs from './pages/ContactUs';
import App1 from './App1';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/lockout" element={<Lockout />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/chatgpt" element={<ProtectedRoute component={App1} />} />
      </Routes>
    </Router>
  );
};

export default App;
