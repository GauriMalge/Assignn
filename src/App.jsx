import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    // Check if user is already logged in (on page refresh)
    const token = localStorage.getItem('authToken');
    const savedUsername = localStorage.getItem('username');
    
    if (token && savedUsername) {
      // Verify token is not expired (basic check)
      try {
        const tokenData = JSON.parse(atob(token));
        if (tokenData.exp > Date.now()) {
          setIsAuthenticated(true);
          setUsername(savedUsername);
          setAuthToken(token);
        } else {
          // Token expired, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('username');
        }
      } catch (error) {
        // Invalid token, clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
      }
    }
  }, []);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    setAuthToken(token);
    setUsername(localStorage.getItem('username'));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken('');
    setUsername('');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show dashboard if authenticated
  return <Dashboard username={username} onLogout={handleLogout} />;
}

export default App;
