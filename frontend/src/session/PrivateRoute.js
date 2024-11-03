// components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../session/AuthContext';

function PrivateRoute({ children }) {
  const { authenticated } = useContext(AuthContext);

  if (authenticated === null) {
    // Ainda carregando o status de autenticação
    return <div>Carregando...</div>; // Ou qualquer componente de carregamento
  }

  return authenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
