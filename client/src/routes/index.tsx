import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import LoadingSpinner from '../components/shared/LoadingSpinner';

// Lazy load pages - each page loads only when visited
const Home = lazy(() => import('../pages/Home'));
const Colleges = lazy(() => import('../pages/Colleges'));
const CollegeDetails = lazy(() => import('../pages/CollegeDetails'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Admission = lazy(() => import('../pages/Admission'));
const MyCollege = lazy(() => import('../pages/MyCollege'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading fallback component shown while pages load
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <LoadingSpinner />
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/colleges/:id" element={<CollegeDetails />} />
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
    </Suspense>
  );
};

export default AppRoutes;