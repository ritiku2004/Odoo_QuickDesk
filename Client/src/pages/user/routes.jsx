import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import AppLayout from '../../layouts/AppLayout';
import UserDashboard from './UserDashboard';
import CreateTicketPage from './CreateTicketPage';
import TicketDetailPage from './TicketDetailPage'; // Assuming you create this page

// These routes are for any authenticated user (END_USER, AGENT, ADMIN)
const UserRoutes = (
  <Route path="user" element={<ProtectedRoute allowedRoles={['END_USER', 'USER', 'AGENT', 'ADMIN']} />}>
    <Route element={<AppLayout />}>
      <Route path="dashboard" element={<UserDashboard />} />
      <Route path="tickets/:id" element={<TicketDetailPage />} />
      <Route path="tickets/new" element={<CreateTicketPage />} />
    </Route>
  </Route>
);

export default UserRoutes;