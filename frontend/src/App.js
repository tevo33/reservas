// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import { AuthProvider } from './session/AuthContext';
import PrivateRoute from './session/PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Rotas protegidas */}
      <Route
        path="/main/*"
        element={
          <PrivateRoute>
            <MainMenu />
          </PrivateRoute>
        }
      />
      {/* Redireciona rotas desconhecidas para login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
