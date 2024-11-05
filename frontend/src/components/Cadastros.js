import React, { useState, useEffect } from "react";
import api from "../api/api";

function Cadastros() {
  const [activeTab, setActiveTab] = useState("bens");

  const [descricao, setDescricao] = useState("");
  const [permiteReserva, setPermiteReserva] = useState(false);
  const [statusBem, setStatusBem] = useState("DISPONIVEL");
  const [tipoBem, setTipoBem] = useState("EQUIPAMENTO");

  const statusBemOptions = ["DISPONIVEL", "EM_MANUTENCAO", "RESERVADO"];
  const tipoBemOptions = ["EQUIPAMENTO", "FERRAMENTA", "OUTRO"];

  const [kitNome, setKitNome] = useState("");
  const [kitItens, setKitItens] = useState([]);
  const [bensDisponiveis, setBensDisponiveis] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBens = async () => {
      try {
        const response = await api.get("/bens");
        setBensDisponiveis(response.data);
      } catch (err) {
        console.error("Erro ao buscar bens:", err);
      }
    };

    fetchBens();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
    setSuccess(false);
  };

  const handleSubmitBem = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/bens", {
        descricao,
        permiteReserva,
        statusBem,
        tipoBem,
      });
      console.log("Bem cadastrado:", response.data);
      setDescricao("");
      setPermiteReserva(false);
      setStatusBem("DISPONIVEL");
      setTipoBem("EQUIPAMENTO");
      setSuccess(true);
    } catch (err) {
      setError("Erro ao cadastrar bem. Tente novamente.");
      console.error("Erro ao cadastrar bem:", err);
    }
  };

  const handleSubmitKit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
  
    try {
      const bemIds = kitItens.map((bem) => bem.idBem);
      const response = await api.post("/kits", {
        nome: kitNome,
        bemIds,
      });
      console.log("Kit cadastrado:", response.data);
      setKitNome("");
      setKitItens([]);
      setSuccess(true);
    } catch (err) {
      setError("Erro ao cadastrar kit. Tente novamente.");
      console.error("Erro ao cadastrar kit:", err);
    }
  };

  const handleAddKitItem = (bem) => {
    if (!kitItens.find((item) => item.idBem === bem.idBem)) {
      setKitItens([...kitItens, bem]);
    }
  };

  const handleRemoveKitItem = (bemId) => {
    setKitItens(kitItens.filter((item) => item.idBem !== bemId));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Cadastros</h1>
      <div className="mb-4">
        <button
          onClick={() => handleTabChange("bens")}
          className={`p-2 ${activeTab === "bens" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Bens
        </button>
        <button
          onClick={() => handleTabChange("kits")}
          className={`p-2 ${activeTab === "kits" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Kits
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Cadastro realizado com sucesso!</p>}

      {activeTab === "bens" && (
        <form onSubmit={handleSubmitBem}>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição do Bem:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Permite Reserva:</label>
            <input
              type="checkbox"
              checked={permiteReserva}
              onChange={(e) => setPermiteReserva(e.target.checked)}
              className="ml-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status do Bem:</label>
            <select
              value={statusBem}
              onChange={(e) => setStatusBem(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              {statusBemOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Bem:</label>
            <select
              value={tipoBem}
              onChange={(e) => setTipoBem(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              {tipoBemOptions.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Cadastrar Bem
          </button>
        </form>
      )}

      {activeTab === "kits" && (
        <form onSubmit={handleSubmitKit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome do Kit:</label>
            <input
              type="text"
              value={kitNome}
              onChange={(e) => setKitNome(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Itens do Kit:</label>
            <div className="flex mb-2">
              <select
                onChange={(e) => handleAddKitItem(JSON.parse(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Selecione um bem para adicionar</option>
                {bensDisponiveis.map((bem) => (
                  <option key={bem.idBem} value={JSON.stringify(bem)}>
                    {bem.descricao}
                  </option>
                ))}
              </select>
            </div>
            <ul>
              {kitItens.map((item) => (
                <li key={item.idBem} className="flex justify-between items-center mb-2">
                  {item.descricao}
                  <button
                    type="button"
                    onClick={() => handleRemoveKitItem(item.idBem)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Cadastrar Kit
          </button>
        </form>
      )}
    </div>
  );
}

export default Cadastros;
