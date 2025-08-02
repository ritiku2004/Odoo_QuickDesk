import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import AppLayout from '../../layouts/AppLayout';
import AgentDashboard from './AgentDashboard';
import AgentTicketView from './AgentTicketView';

const AgentRoutes = (
  <Route
    path="agent"
    element={<ProtectedRoute allowedRoles={['AGENT', 'ADMIN']} />}
  >
    <Route element={<AppLayout />}>
      <Route path="dashboard" element={<AgentDashboard />} />
      <Route path="tickets/:id" element={<AgentTicketView />} />
    </Route>
  </Route>
);

export default AgentRoutes;