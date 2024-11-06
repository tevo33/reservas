import React, { useState } from 'react';

function Multas() {
  const [userId, setUserId] = useState('');
  const [multas, setMultas] = useState([]);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  const handleBuscarMultas = () => {
    setError(null);
    setMultas([]);
    setUserName('');

    if (!userId) {
      setError('Por favor, insira o ID do usuário.');
      return;
    }

    // Dados fictícios de multas para cada usuário
    const multasData = {
      1: {
        name: 'Estevão Busch Guerra',
        multas: [
          {
            id: 1,
            item: 'Livro de Java',
            valor: 25.50,
            dataVencimento: '2024-10-01',
          },
          {
            id: 2,
            item: 'Chromebook',
            valor: 100.00,
            dataVencimento: '2024-09-15',
          },
        ],
      },
      2: {
        name: 'Tiago Patzlaff',
        multas: [
          {
            id: 3,
            item: 'Calculadora Científica',
            valor: 50.00,
            dataVencimento: '2024-10-10',
          },
          {
            id: 4,
            item: 'Tablet',
            valor: 150.00,
            dataVencimento: '2024-09-20',
          },
        ],
      },
    };

    const usuario = multasData[userId];
    if (!usuario) {
      setError('Nenhuma multa encontrada para o usuário especificado.');
    } else {
      setUserName(usuario.name);
      setMultas(usuario.multas);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Multas</h2>
      <div className="mb-4">
        <label className="block text-gray-700">ID do Usuário:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleBuscarMultas}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Buscar Multas
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {userName && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Multas de {userName}</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Item</th>
                <th className="border px-4 py-2">Valor</th>
                <th className="border px-4 py-2">Data de Vencimento</th>
              </tr>
            </thead>
            <tbody>
              {multas.map((multa) => (
                <tr key={multa.id}>
                  <td className="border px-4 py-2">{multa.item}</td>
                  <td className="border px-4 py-2 text-red-500">R$ {multa.valor.toFixed(2)}</td>
                  <td className="border px-4 py-2">{new Date(multa.dataVencimento).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Multas;
