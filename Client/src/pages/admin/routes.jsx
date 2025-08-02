import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import AppLayout from "../../layouts/AppLayout.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import UserManagementPage from "./UserManagementPage.jsx";
import CategoryManagementPage from "./CategoryManagementPage.jsx";

// These routes are ONLY for ADMIN users
const AdminRoutes = (
  <Route path="admin" element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
     <Route element={<AppLayout />}>
      <Route index element={<AdminDashboard />} /> 
      <Route path="users" element={<UserManagementPage />} />
      <Route path="categories" element={<CategoryManagementPage />} />
    </Route>
  </Route>
);

export default AdminRoutes;