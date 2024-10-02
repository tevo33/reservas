import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [codigo, setCodigo] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulação de login
        if (codigo && senha) {
            navigate('/main', { state: { userName: codigo } });
        } else {
            alert('Por favor, insira o código e a senha.');
        }
    };

    const handleCodigoChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setCodigo(value);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Acessar sistema</h2>
                <input
                    type="text"
                    placeholder="Código"
                    value={codigo}
                    onChange={handleCodigoChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    inputMode="numeric"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}

export default Login;