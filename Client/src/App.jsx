import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import PublicRoutes from './pages/public/routes.jsx';
import UserRoutes from './pages/user/routes.jsx';
import AdminRoutes from './pages/admin/routes.jsx';
import AgentRoutes from './pages/agent/routes.jsx';
import TicketDetailPage from './pages/user/TicketDetailPage.jsx'; // Importing TicketDetailPage
import LoginPage from './pages/public/LoginPage.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="tickets/:id" element={<TicketDetailPage />} />
          {PublicRoutes}
          {UserRoutes}
          {AgentRoutes}
          {AdminRoutes}
          <Route path="*" element={<LoginPage></LoginPage>} />
          <Route path="/unauthorized" element={<div>404 Unauthorized</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;