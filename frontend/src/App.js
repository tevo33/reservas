import "./App.css";

function App({ userName }) {
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
              <a href="#cadastros" className="block hover:underline">
                Cadastros
              </a>
            </li>
            <li>
              <a href="#processos-bem" className="block hover:underline">
                Processos Bem
              </a>
            </li>
            <li>
              <a href="#reservas" className="block hover:underline">
                Reservas
              </a>
            </li>
            <li>
              <a href="#multas" className="block hover:underline">
                Multas
              </a>
            </li>
            <li>
              <a href="#minhas-reservas" className="block hover:underline">
                Minhas reservas/retiradas
              </a>
            </li>
            <li>
              <a href="#relatorios-bens" className="block hover:underline">
                Relatórios Bens
              </a>
            </li>
            <li>
              <a href="#logout" className="block hover:underline">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{/* Conteúdo principal */}</main>
    </div>
  );
}

export default App;
