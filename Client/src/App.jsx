import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import PublicRoutes from './pages/public/routes.jsx';
import UserRoutes from './pages/user/routes.jsx';
import AdminRoutes from './pages/admin/routes.jsx';
import AgentRoutes from './pages/agent/routes.jsx';
import TicketDetailPage from './pages/user/TicketDetailPage.jsx'; // Importing TicketDetailPage

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
          <Route
  path="*"
  element={
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-6">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl font-semibold mb-2">Page Not Found</p>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Sorry, the page you're looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go to Home
      </a>
    </div>
  }
/>

          <Route path="/unauthorized" element={<div>404 Unauthorized</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;