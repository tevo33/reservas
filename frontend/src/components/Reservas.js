import React, { useState } from 'react';

function Reservas() {
  const [itemId, setItemId] = useState('');
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  const handleBuscarReservas = () => {
    setError(null);

    if (!itemId) {
      setError('Por favor, insira o ID do item.');
      setReservas([]);
      return;
    }

    // Dados fictícios com apenas duas pessoas
    const dadosFicticios = [
      {
        id: 1,
        pessoa: 'Estevão Busch Guerra',
        dataReserva: '2024-12-01',
      },
      {
        id: 2,
        pessoa: 'Tiago Patzlaff',
        dataReserva: '2024-12-05',
      },
    ];

    setReservas(dadosFicticios);
  };

  const handleItemIdChange = (e) => {
    setItemId(e.target.value);

    // Limpa as reservas quando o campo fica vazio
    if (e.target.value === '') {
      setReservas([]);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reservas</h2>
      <div className="mb-4">
        <label className="block text-gray-700">ID do Item:</label>
        <input
          type="text"
          value={itemId}
          onChange={handleItemIdChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleBuscarReservas}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Buscar Reservas
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {reservas.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Reservas para o Item {itemId}</h3>
          <ul className="list-disc pl-5">
            {reservas.map((reserva) => (
              <li key={reserva.id} className="mb-2">
                <p><strong>Pessoa:</strong> {reserva.pessoa}</p>
                <p><strong>Data da Reserva:</strong> {new Date(reserva.dataReserva).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Reservas;
