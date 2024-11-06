import React, { useState, useEffect } from 'react';

function MinhasReservas() {
  const [reservasAtuais, setReservasAtuais] = useState([]);
  const [reservasNoPrazo, setReservasNoPrazo] = useState([]);
  const [reservasAtrasadas, setReservasAtrasadas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  useEffect(() => {
    // Dados fictícios de reservas atuais (uma no prazo e uma atrasada)
    const atuais = [
      {
        id: 1,
        item: 'Livro de Java',
        dataFim: '2024-12-01', // No prazo
      },
      {
        id: 2,
        item: 'Notebook emprestado',
        dataFim: '2024-10-01', // Atrasada
      },
    ];

    const noPrazo = atuais.filter(reserva => new Date(reserva.dataFim) >= new Date());
    const atrasadas = atuais.filter(reserva => new Date(reserva.dataFim) < new Date());
    setReservasAtuais(atuais);
    setReservasNoPrazo(noPrazo);
    setReservasAtrasadas(atrasadas);
  }, []);

  const handleBuscarReservas = () => {
    setError(null);
    setReservas([]);

    if (!dataInicio || !dataFim) {
      setError('Por favor, insira as datas de início e fim.');
      return;
    }

    // Dados fictícios para reservas no período especificado
    const reservasNoPeriodo = [
      {
        id: 3,
        item: 'Mesa de estudos',
        dataReserva: '2024-11-10',
      },
      {
        id: 4,
        item: 'Cadeira de escritório',
        dataReserva: '2024-11-15',
      },
    ];

    setReservas(reservasNoPeriodo);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Minhas reservas/retiradas</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Reservas Atuais</h3>
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2">No Prazo</h4>
          <ul className="list-disc pl-5">
            {reservasNoPrazo.map((reserva) => (
              <li key={reserva.id} className="mb-2">
                <p><strong>Item:</strong> {reserva.item}</p>
                <p><strong>Data de Fim:</strong> {new Date(reserva.dataFim).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2">Atrasadas</h4>
          <ul className="list-disc pl-5">
            {reservasAtrasadas.map((reserva) => (
              <li key={reserva.id} className="mb-2">
                <p><strong>Item:</strong> {reserva.item}</p>
                <p><strong>Data de Fim:</strong> {new Date(reserva.dataFim).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">De:</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Até:</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleBuscarReservas}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Buscar Reservas
      </button>

      {reservas.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Reservas no Período</h3>
          <ul className="list-disc pl-5">
            {reservas.map((reserva) => (
              <li key={reserva.id} className="mb-2">
                <p><strong>Item:</strong> {reserva.item}</p>
                <p><strong>Data da Reserva:</strong> {new Date(reserva.dataReserva).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MinhasReservas;
