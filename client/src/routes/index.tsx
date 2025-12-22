import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Colleges from '../pages/Colleges';
import CollegeDetails from '../pages/CollegeDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admission from '../pages/Admission';
import MyCollege from '../pages/MyCollege';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/colleges" element={<Colleges />} />
      <Route path="/colleges/:id" element={
        <PrivateRoute>
          <CollegeDetails />
        </PrivateRoute>
      } />
      <Route path="/admission" element={
        <PrivateRoute>
          <Admission />
        </PrivateRoute>
      } />
      <Route path="/my-college" element={
        <PrivateRoute>
          <MyCollege />
        </PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;