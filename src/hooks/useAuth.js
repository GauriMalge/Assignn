import { useState, useEffect } from 'react';

export const useAuth = () => {
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

  const login = (token) => {
    setIsAuthenticated(true);
    setAuthToken(token);
    setUsername(localStorage.getItem('username'));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthToken('');
    setUsername('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  return {
    isAuthenticated,
    username,
    authToken,
    login,
    logout
  };
};
