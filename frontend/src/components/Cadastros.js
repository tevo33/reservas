import React, { useState } from 'react';

function Cadastros() {
    const [selectedOption, setSelectedOption] = useState('Bens');

    const renderContent = () => {
        console.log('Selected Option:', selectedOption);
        switch (selectedOption) {
            case 'Bens':
                return (
                    <div>
                        <h3>Bens</h3>
                        <p>Conteúdo da sub-opção Bens.</p>
                    </div>
                );
            case 'Kits':
                return (
                    <div>
                        <h3>Kits</h3>
                        <p>Conteúdo da sub-opção Kits.</p>
                    </div>
                );
            case 'TipoDeBem':
                return (
                    <div>
                        <h3>Tipo de Bem</h3>
                        <p>Conteúdo da sub-opção Tipo de Bem.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Cadastros</h2>
            <div className="menu-flutuante">
                <button onClick={() => setSelectedOption('Bens')} className="menu-button">Bens</button>
                <button onClick={() => setSelectedOption('Kits')} className="menu-button">Kits</button>
                <button onClick={() => setSelectedOption('TipoDeBem')} className="menu-button">Tipo de bem</button>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Cadastros;