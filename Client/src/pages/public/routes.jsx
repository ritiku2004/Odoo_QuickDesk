import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";
import AuthLayout from "../../layouts/AuthLayout.jsx";

// These routes are open to everyone
const PublicRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
  </Route>
);

export default PublicRoutes;