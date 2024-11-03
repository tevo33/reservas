import React, { useState } from "react";
import api from "../api/api";

function CadastroPessoas() {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("FUNCIONARIO");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
        const response = await api.post("/pessoas", {
        nome: nome,
        codigo: codigo,
        senha: senha,
        tipoPessoa: tipoPessoa,
      });

      console.log("Pessoa cadastrada:", response.data);
      setSuccess(true);
      setNome("");
      setCodigo("");
      setSenha("");
      setTipoPessoa("FUNCIONARIO");
    } catch (err) {
      setError("Erro ao cadastrar pessoa. Tente novamente.");
      console.error("Erro ao cadastrar pessoa:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Pessoas</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">Pessoa cadastrada com sucesso!</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Código:</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Pessoa:</label>
          <select
            value={tipoPessoa}
            onChange={(e) => setTipoPessoa(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="FUNCIONARIO">Funcionário</option>
            <option value="CLIENTE">Cliente</option>
            <option value="FORNECEDOR">Fornecedor</option>
            <option value="ALUNO">Aluno</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroPessoas;
