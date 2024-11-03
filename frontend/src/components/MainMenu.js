// components/MainMenu.js
import React, { useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../session/AuthContext";
import Cadastros from "./Cadastros";
import ProcessosBem from "./ProcessosBem";
import Reservas from "./Reservas";
import Multas from "./Multas";
import MinhasReservas from "./MinhasReservas";
import RelatoriosBens from "./RelatoriosBens";
import CadastroPessoas from "./CadastroPessoas";

function MainMenu() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const userName = "Usuário"; // Ajuste para obter o nome real do usuário, se disponível

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

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
              <Link to="cadastros" className="block hover:underline">
                Cadastros
              </Link>
            </li>
            <li>
              <Link to="processos-bem" className="block hover:underline">
                Processos Bem
              </Link>
            </li>
            <li>
              <Link to="reservas" className="block hover:underline">
                Reservas
              </Link>
            </li>
            <li>
              <Link to="multas" className="block hover:underline">
                Multas
              </Link>
            </li>
            <li>
              <Link to="minhas-reservas" className="block hover:underline">
                Minhas reservas/retiradas
              </Link>
            </li>
            <li>
              <Link to="relatorios-bens" className="block hover:underline">
                Relatórios Bens
              </Link>
            </li>
            <li>
              <Link to="cadastro-pessoas" className="block hover:underline">
                Cadastro de Pessoas
              </Link>
            </li>
            <li>
              <button onClick={logout} className="block hover:underline">
                Logout
              </button>
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
          <Route path="cadastro-pessoas" element={<CadastroPessoas />} />
        </Routes>
      </main>
    </div>
  );
}

export default MainMenu;
