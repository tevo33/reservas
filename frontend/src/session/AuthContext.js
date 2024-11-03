// session/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { setOnUnauthorized } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null); // Inicialmente 'null'
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');

    if (token) {
      setAuthenticated(true);
      setUserName(storedUserName || '');
    } else {
      setAuthenticated(false);
    }

    // Define o manipulador de logout para ser chamado pelo api.js
    setOnUnauthorized(() => {
      handleLogout();
    });
  }, []);

  const handleLogin = (token, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    setAuthenticated(true);
    setUserName(userName);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setAuthenticated(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ authenticated, userName, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
