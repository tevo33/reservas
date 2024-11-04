import React, { useState, useEffect } from 'react';
import api from '../api/api';

function Multas() {
  const [multas, setMultas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch multas pendentes do usuário ao montar o componente
    const fetchMultas = async () => {
      try {
        const response = await api.get('/minhas-multas');
        setMultas(response.data);
      } catch (err) {
        setError('Erro ao buscar multas. Tente novamente.');
        console.error('Erro ao buscar multas:', err);
      }
    };

    fetchMultas();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Multas</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {multas.length > 0 ? (
        <ul className="list-disc pl-5">
          {multas.map((multa) => (
            <li key={multa.id} className="mb-2">
              <p><strong>Item:</strong> {multa.item}</p>
              <p><strong>Valor:</strong> R$ {multa.valor.toFixed(2)}</p>
              <p><strong>Data de Vencimento:</strong> {new Date(multa.dataVencimento).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-500">Não há multas pendentes.</p>
      )}
    </div>
  );
}

export default Multas;