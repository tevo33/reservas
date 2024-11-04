// session/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(true); // Autenticado por padrão
  const [userName, setUserName] = useState('Usuário Teste'); // Nome de usuário padrão

  const handleLogin = () => {
    setAuthenticated(true);
    setUserName('Usuário Teste');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ authenticated, userName, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
