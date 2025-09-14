import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './components/Home';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, username, login, logout } = useAuth();

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  // Show dashboard if authenticated
  return <Dashboard username={username} onLogout={logout} />;
}

export default App;
