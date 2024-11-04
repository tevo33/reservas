import React, { useState } from 'react';
import api from '../api/api';

function Reservas() {
  const [itemId, setItemId] = useState('');
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  const handleBuscarReservas = async () => {
    setError(null);
    setReservas([]);

    if (!itemId) {
      setError('Por favor, insira o ID do item.');
      return;
    }

    try {
      const response = await api.get(`/reservas/${itemId}`);
      setReservas(response.data);
    } catch (err) {
      setError('Erro ao buscar reservas. Tente novamente.');
      console.error('Erro ao buscar reservas:', err);
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
          onChange={(e) => setItemId(e.target.value)}
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