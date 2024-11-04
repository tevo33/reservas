// components/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../session/AuthContext";

function Login() {
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleLoginSubmit = async () => {
    if (!codigo || !senha) {
      alert("Por favor, insira o código e a senha.");
      return;
    }

    try {
      const response = await api.post("/pessoas/login", {
        codigo: codigo,
        senha: senha,
      });

      const token = response.data.token;

      if (token) {
        handleLogin(token);
        navigate("/main/cadastro-pessoas");
      } else {
        alert("Não foi possível realizar o login. Token não recebido.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Código ou senha inválidos.");
      } else {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLoginSubmit();
    }
  };

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Acessar sistema</h2>
        <input
          type="text"
          placeholder="Código"
          value={codigo}
          onChange={handleCodigoChange}
          onKeyPress={handleKeyPress}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleLoginSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;