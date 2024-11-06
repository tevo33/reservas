import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function RelatoriosBens() {
  const [alunoId, setAlunoId] = useState('');
  const [alunoNome, setAlunoNome] = useState('');
  const [relatorios, setRelatorios] = useState([]);
  const [error, setError] = useState(null);

  // Dados fictícios
  const dadosFicticios = [
    { id: 1, nomeAluno: 'João Silva', curso: 'Engenharia de Software', item: 'Chromebook', dataRetirada: '2023-10-01', dataValidade: '2023-10-15', status: 'Em uso', contato: 'joao.silva@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Ricardo' },
    { id: 2, nomeAluno: 'Maria Oliveira', curso: 'Engenharia de Computação', item: 'Arduino Kit', dataRetirada: '2023-10-05', dataValidade: '2023-10-20', status: 'Devolvido', contato: 'maria.oliveira@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Fernanda' },
    { id: 3, nomeAluno: 'Carlos Souza', curso: 'Análise e Desenvolvimento de Sistemas', item: 'Raspberry Pi', dataRetirada: '2023-10-10', dataValidade: '2023-10-25', status: 'Em uso', contato: 'carlos.souza@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Eduardo' },
    { id: 4, nomeAluno: 'Ana Paula', curso: 'Ciências da Computação', item: 'Laptop Dell', dataRetirada: '2023-10-12', dataValidade: '2023-10-27', status: 'Em uso', contato: 'ana.paula@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Juliana' },
    { id: 5, nomeAluno: 'Pedro Santos', curso: 'Engenharia de Software', item: 'Monitor 24"', dataRetirada: '2023-10-15', dataValidade: '2023-10-30', status: 'Devolvido', contato: 'pedro.santos@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Marcelo' },
    { id: 6, nomeAluno: 'Lucas Lima', curso: 'Engenharia de Computação', item: 'Teclado Mecânico', dataRetirada: '2023-10-18', dataValidade: '2023-11-02', status: 'Em uso', contato: 'lucas.lima@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Camila' },
    { id: 7, nomeAluno: 'Mariana Costa', curso: 'Análise e Desenvolvimento de Sistemas', item: 'Mouse Gamer', dataRetirada: '2023-10-20', dataValidade: '2023-11-04', status: 'Em uso', contato: 'mariana.costa@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Bruno' },
    { id: 8, nomeAluno: 'Fernanda Almeida', curso: 'Ciências da Computação', item: 'Fone de Ouvido Bluetooth', dataRetirada: '2023-10-22', dataValidade: '2023-11-06', status: 'Devolvido', contato: 'fernanda.almeida@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Daniela' },
    { id: 9, nomeAluno: 'Rafael Pereira', curso: 'Engenharia de Software', item: 'Câmera Web HD', dataRetirada: '2023-10-25', dataValidade: '2023-11-09', status: 'Em uso', contato: 'rafael.pereira@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Felipe' },
    { id: 10, nomeAluno: 'Beatriz Fernandes', curso: 'Engenharia de Computação', item: 'Microfone USB', dataRetirada: '2023-10-28', dataValidade: '2023-11-12', status: 'Em uso', contato: 'beatriz.fernandes@univates.br', observacoes: 'Nenhuma', responsavel: 'Prof. Larissa' },
  ];

  useEffect(() => {
    if (alunoId) {
      // Simulação de busca do nome do aluno com base no ID
      const aluno = dadosFicticios.find(dado => dado.id.toString() === alunoId);
      if (aluno) {
        setAlunoNome(aluno.nomeAluno);
      } else {
        setAlunoNome('Aluno não encontrado');
      }
    } else {
      setAlunoNome('');
    }
  }, [alunoId]);

  const handleBuscarRelatorios = () => {
    setError(null);
    setRelatorios([]);

    if (!alunoId) {
      setError('Por favor, insira o ID do aluno.');
      return;
    }

    // Simulação de busca de relatórios com base no ID do aluno
    const relatoriosFiltrados = dadosFicticios.filter(dado => dado.id.toString() === alunoId);
    if (relatoriosFiltrados.length > 0) {
      setRelatorios(relatoriosFiltrados);
    } else {
      setError('Nenhum relatório encontrado para este aluno.');
    }
  };

  const handleBuscarTodosRelatorios = () => {
    setError(null);
    setRelatorios(dadosFicticios);
  };

  const handleGerarPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatórios Bens', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['ID', 'Nome do Aluno', 'Curso', 'Item', 'Data de Retirada', 'Data de Validade', 'Status', 'Contato', 'Observações', 'Responsável']],
      body: relatorios.map(relatorio => [
        relatorio.id,
        relatorio.nomeAluno,
        relatorio.curso,
        relatorio.item,
        new Date(relatorio.dataRetirada).toLocaleDateString(),
        new Date(relatorio.dataValidade).toLocaleDateString(),
        relatorio.status,
        relatorio.contato,
        relatorio.observacoes,
        relatorio.responsavel,
      ]),
    });
    doc.save('relatorios_bens.pdf');
  };

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Relatórios Bens</h2>
      <div className="mb-4">
        <label className="block text-gray-700">ID do Aluno:</label>
        <input
          type="text"
          value={alunoId}
          onChange={(e) => setAlunoId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <p className="text-gray-500 mt-2">Nome do Aluno: {alunoNome || 'Digite o ID do aluno'}</p>
      </div>
      <button
        onClick={handleBuscarRelatorios}
        className="bg-blue-500 text-white p-2 rounded w-full mb-4"
      >
        Buscar Reservas
      </button>
      <button
        onClick={handleBuscarTodosRelatorios}
        className="bg-cyan-500 text-white p-2 rounded w-full mb-4"
      >
        Buscar Todas as reservas
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Relatórios</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 border border-gray-300">ID</th>
                <th className="py-2 border border-gray-300">Nome do Aluno</th>
                <th className="py-2 border border-gray-300">Curso</th>
                <th className="py-2 border border-gray-300">Item</th>
                <th className="py-2 border border-gray-300">Data de Retirada</th>
                <th className="py-2 border border-gray-300">Data de Validade</th>
                <th className="py-2 border border-gray-300">Status</th>
                <th className="py-2 border border-gray-300">Contato</th>
                <th className="py-2 border border-gray-300">Observações</th>
                <th className="py-2 border border-gray-300">Responsável</th>
              </tr>
            </thead>
            <tbody>
              {relatorios.length > 0 ? (
                relatorios.map((relatorio) => (
                  <tr key={relatorio.id}>
                    <td className="border px-4 py-2 border-gray-300">{relatorio.id}</td>
                    <td className="border px-4 py-2 border-gray-300">{relatorio.nomeAluno}</td>
                    <td className="border px-4 py-2 border-gray-300">{relatorio.curso}</td>
                    <td className="border px-4 py-2 border-gray-300">{relatorio.item}</td>
                    <td className="border px-4 py-2 border-gray-300">{new Date(relatorio.dataRetirada).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 border-gray-300">{new Date(relatorio.dataValidade).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 border-gray-300">{relatorio.status}</td>
                    <td className="border px-4 py-2 border-gray-300">{relatorio.contato}</td>
                    <td className="border px-4 py-2 border-gray-300">{relatorio.observacoes}</td>
                    <td className="border px-4 py-2 border-gray-300">{relatorio.responsavel}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="border px-4 py-2 text-center border-gray-300">Nenhum dado disponível</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {relatorios.length > 0 && (
          <button
            onClick={handleGerarPDF}
            className="bg-green-500 text-white p-2 rounded w-full mt-4"
          >
            Gerar PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default RelatoriosBens;