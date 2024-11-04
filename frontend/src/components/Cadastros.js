import React, { useState, useEffect } from "react";
import api from "../api/api";

function Cadastros() {
  const [activeTab, setActiveTab] = useState("bens");

  const [bemNome, setBemNome] = useState("");
  const [kitNome, setKitNome] = useState("");
  const [kitItens, setKitItens] = useState([]);
  const [kitItemInput, setKitItemInput] = useState("");
  const [tipoBemNome, setTipoBemNome] = useState("");
  const [tipoBemSelecionado, setTipoBemSelecionado] = useState("");

  const [tiposBens, setTiposBens] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch tipos de bens disponíveis
    const fetchTiposBens = async () => {
      try {
        const response = await api.get("/tipos-bens");
        setTiposBens(response.data);
      } catch (err) {
        console.error("Erro ao buscar tipos de bens:", err);
      }
    };

    fetchTiposBens();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      let response;
      if (type === "bem") {
        response = await api.post("/bens", {
          nome: bemNome,
          tipoBem: tipoBemSelecionado,
        });
        setBemNome("");
        setTipoBemSelecionado("");
      } else if (type === "kit") {
        response = await api.post("/kits", {
          nome: kitNome,
          itens: kitItens,
        });
        setKitNome("");
        setKitItens([]);
      } else if (type === "tipoBem") {
        response = await api.post("/tipos-bens", { nome: tipoBemNome });
        setTipoBemNome("");
      }

      console.log(`${type} cadastrado:`, response.data);
      setSuccess(true);
    } catch (err) {
      setError(`Erro ao cadastrar ${type}. Tente novamente.`);
      console.error(`Erro ao cadastrar ${type}:`, err);
    }
  };

  const handleAddKitItem = () => {
    if (kitItemInput.trim() !== "") {
      setKitItens([...kitItens, kitItemInput.trim()]);
      setKitItemInput("");
    }
  };

  const handleRemoveKitItem = (index) => {
    setKitItens(kitItens.filter((_, i) => i !== index));
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
        <button
          onClick={() => handleTabChange("tiposBens")}
          className={`p-2 ${activeTab === "tiposBens" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Tipos de Bens
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Cadastro realizado com sucesso!</p>}

      {activeTab === "bens" && (
        <form onSubmit={(e) => handleSubmit(e, "bem")}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome do Bem:</label>
            <input
              type="text"
              value={bemNome}
              onChange={(e) => setBemNome(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Bem:</label>
            <select
              value={tipoBemSelecionado}
              onChange={(e) => setTipoBemSelecionado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Selecione um tipo de bem</option>
              {tiposBens.map((tipo) => (
                <option key={tipo.id} value={tipo.nome}>
                  {tipo.nome}
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
        <form onSubmit={(e) => handleSubmit(e, "kit")}>
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
              <input
                type="text"
                value={kitItemInput}
                onChange={(e) => setKitItemInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={handleAddKitItem}
                className="bg-blue-500 text-white p-2 rounded ml-2"
              >
                Adicionar
              </button>
            </div>
            <ul>
              {kitItens.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveKitItem(index)}
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

      {activeTab === "tiposBens" && (
        <form onSubmit={(e) => handleSubmit(e, "tipoBem")}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome do Tipo de Bem:</label>
            <input
              type="text"
              value={tipoBemNome}
              onChange={(e) => setTipoBemNome(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Cadastrar Tipo de Bem
          </button>
        </form>
      )}
    </div>
  );
}

export default Cadastros;