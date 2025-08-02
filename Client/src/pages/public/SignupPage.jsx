import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();


  // Redirect authenticated users using useEffect
  React.useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'ADMIN') navigate('/admin');
      else if (user?.role === 'AGENT') navigate('/agent/dashboard');
      else if (user?.role === 'USER' || user?.role === 'END_USER') navigate('/user/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign up.');
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center tracking-tight">Sign Up</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-center text-sm font-medium shadow">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-all"
        >
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          className="text-blue-600 hover:underline font-medium"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  </div>
);

}
export default SignupPage;