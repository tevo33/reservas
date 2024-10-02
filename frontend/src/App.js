import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Cadastros from "./components/Cadastros";
import ProcessosBem from "./components/ProcessosBem";
import Reservas from "./components/Reservas";
import Multas from "./components/Multas";
import MinhasReservas from "./components/MinhasReservas";
import RelatoriosBens from "./components/RelatoriosBens";
import Login from "./components/Login";
import CadastroPessoas from "./components/CadastroPessoas";

function MainMenu({ userName }) {
  return (
    <div className="flex min-h-screen bg-gray-200 text-black">
      <aside className="bg-blue-900 w-64 p-6 text-white">
        <h1 className="text-2xl font-bold mb-6">Reservas de Itens</h1>
        <p className="text-lg mb-4">Olá, {userName}</p>
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">
          Menu Principal
        </h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/main/cadastros" className="block hover:underline">
                Cadastros
              </Link>
            </li>
            <li>
              <Link to="/main/processos-bem" className="block hover:underline">
                Processos Bem
              </Link>
            </li>
            <li>
              <Link to="/main/reservas" className="block hover:underline">
                Reservas
              </Link>
            </li>
            <li>
              <Link to="/main/multas" className="block hover:underline">
                Multas
              </Link>
            </li>
            <li>
              <Link
                to="/main/minhas-reservas"
                className="block hover:underline"
              >
                Minhas reservas/retiradas
              </Link>
            </li>
            <li>
              <Link
                to="/main/relatorios-bens"
                className="block hover:underline"
              >
                Relatórios Bens
              </Link>
            </li>
            <li>
              <Link
                to="/main/cadastro-pessoas"
                className="block hover:underline"
              >
                Cadastro de Pessoas
              </Link>
            </li>
            <li>
              <Link to="/logout" className="block hover:underline">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="cadastros" element={<Cadastros />} />
          <Route path="processos-bem" element={<ProcessosBem />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="multas" element={<Multas />} />
          <Route path="minhas-reservas" element={<MinhasReservas />} />
          <Route path="relatorios-bens" element={<RelatoriosBens />} />
          <Route path="cadastro-pessoas" element={<CadastroPessoas />} />{" "}
          {/* Nova rota */}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={<MainMenu userName="Usuário" />} />
        {/* Adicione uma rota padrão para redirecionar para a página de login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
