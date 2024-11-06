import React, { useState, useEffect } from 'react';
import api from '../api/api';

function ProcessosBem() {
  const [activeTab, setActiveTab] = useState('retirada');

  const [bemId, setBemId] = useState('');
  const [bemNome, setBemNome] = useState('');
  const [pessoaId, setPessoaId] = useState('');
  const [pessoaNome, setPessoaNome] = useState('');
  const [data, setData] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [observacao, setObservacao] = useState('');
  const [motivoRetirada, setMotivoRetirada] = useState('USO_INTERNO');
  const [quantidade, setQuantidade] = useState(1);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Define a data atual como valor padrão
    const today = new Date().toISOString().split('T')[0];
    setData(today);
  }, []);

  useEffect(() => {
    if (bemId) {
      const fetchBemNome = async () => {
        try {
          const response = await api.get(`/bens/${bemId}`);
          setBemNome(response.data.descricao);
        } catch (err) {
          setBemNome('Bem não encontrado');
          console.error('Erro ao buscar nome do bem:', err);
        }
      };
      fetchBemNome();
    } else {
      setBemNome('');
    }
  }, [bemId]);

  useEffect(() => {
    if (pessoaId) {
      const fetchPessoaNome = async () => {
        try {
          const response = await api.get(`/pessoas/${pessoaId}`);
          setPessoaNome(response.data.nome);
        } catch (err) {
          setPessoaNome('Pessoa não encontrada');
          console.error('Erro ao buscar nome da pessoa:', err);
        }
      };
      fetchPessoaNome();
    } else {
      setPessoaNome('');
    }
  }, [pessoaId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
    setSuccess(false);
    setBemId('');
    setBemNome('');
    setPessoaId('');
    setPessoaNome('');
    const today = new Date().toISOString().split('T')[0];
    setData(today);
    setDataDevolucao('');
    setObservacao('');
    setMotivoRetirada('USO_INTERNO');
    setQuantidade(1);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      let response;
      if (type === 'retirada') {
        response = await api.post('/retiradas', {
          data,
          dataDevolucao: dataDevolucao || null,
          observacao,
          motivoRetirada,
          pessoaId: parseInt(pessoaId),
          itensRetirada: [
            {
              bemId: parseInt(bemId),
              quantidade: parseInt(quantidade),
            },
          ],
        });
      } else if (type === 'devolucao') {
        response = await api.put('/retiradas/devolver', {
          data,
          dataDevolucao: dataDevolucao || null,
          observacao,
          motivoRetirada,
          pessoaId: parseInt(pessoaId),
          itensRetirada: [
            {
              bemId: parseInt(bemId),
              quantidade: parseInt(quantidade),
            },
          ],
        });   
         } else if (type === 'baixar') {
        // Implementar lógica para 'baixar' quando disponível
      } else if (type === 'repor') {
        // Implementar lógica para 'repor' quando disponível
      }

      console.log(`${type} realizada:`, response.data);
      setSuccess(true);
    } catch (err) {
      setError(`Erro ao realizar ${type}. Tente novamente.`);
      console.error(`Erro ao realizar ${type}:`, err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Processos Bem</h2>
      <div className="mb-4">
        <button
          onClick={() => handleTabChange('retirada')}
          className={`p-2 ${activeTab === 'retirada' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Retirada
        </button>
        <button
          onClick={() => handleTabChange('devolucao')}
          className={`p-2 ${activeTab === 'devolucao' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Devolução
        </button>
        <button
          onClick={() => handleTabChange('baixar')}
          className={`p-2 ${activeTab === 'baixar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Baixar Bem
        </button>
        <button
          onClick={() => handleTabChange('repor')}
          className={`p-2 ${activeTab === 'repor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Repor Bem
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Operação realizada com sucesso!</p>}

      {activeTab === 'retirada' && (
        <form onSubmit={(e) => handleSubmit(e, 'retirada')}>
          <div className="mb-4">
            <label className="block text-gray-700">ID do Bem:</label>
            <input
              type="text"
              value={bemId}
              onChange={(e) => setBemId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <p className="text-gray-500 mt-2">Nome do Bem: {bemNome || 'Digite o ID do bem'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantidade:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ID da Pessoa:</label>
            <input
              type="text"
              value={pessoaId}
              onChange={(e) => setPessoaId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <p className="text-gray-500 mt-2">Nome da Pessoa: {pessoaNome || 'Digite o ID da pessoa'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Data de Retirada:</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Data limite de Devolução:</label>
            <input
              type="date"
              value={dataDevolucao}
              onChange={(e) => setDataDevolucao(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Motivo da Retirada:</label>
            <select
              value={motivoRetirada}
              onChange={(e) => setMotivoRetirada(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="USO_INTERNO">Uso Interno</option>
              <option value="EMPRESTIMO">Empréstimo</option>
              <option value="MANUTENCAO">Manutenção</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Observação:</label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Realizar Retirada
          </button>
        </form>
      )}

{activeTab === 'devolucao' && (
        <form onSubmit={(e) => handleSubmit(e, 'devolucao')}>
          <div className="mb-4">
            <label className="block text-gray-700">ID do Bem:</label>
            <input
              type="text"
              value={bemId}
              onChange={(e) => setBemId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <p className="text-gray-500 mt-2">Nome do Bem: {bemNome || 'Digite o ID do bem'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantidade:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ID da Pessoa:</label>
            <input
              type="text"
              value={pessoaId}
              onChange={(e) => setPessoaId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <p className="text-gray-500 mt-2">Nome da Pessoa: {pessoaNome || 'Digite o ID da pessoa'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Data:</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Realizar Devolução
          </button>
        </form>
      )}

      {activeTab === 'baixar' && (
        <form onSubmit={(e) => handleSubmit(e, 'baixar')}>
          <div className="mb-4">
            <label className="block text-gray-700">ID do Bem:</label>
            <input
              type="text"
              value={bemId}
              onChange={(e) => setBemId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <p className="text-gray-500 mt-2">Nome do Bem: {bemNome || 'Digite o ID do bem'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantidade:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Baixar Bem
          </button>
        </form>
      )}

      {activeTab === 'repor' && (
        <form onSubmit={(e) => handleSubmit(e, 'repor')}>
          <div className="mb-4">
            <label className="block text-gray-700">ID do Bem:</label>
            <input
              type="text"
              value={bemId}
              onChange={(e) => setBemId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <p className="text-gray-500 mt-2">Nome do Bem: {bemNome || 'Digite o ID do bem'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantidade:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Repor Bem
          </button>
        </form>
      )}
    </div>
  );
}

export default ProcessosBem;