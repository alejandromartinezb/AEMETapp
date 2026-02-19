import { useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import './Header.css';
import Toggle from '../toggle/Toggle';

function Header({ onSearch }) {
    const [codigo, setCodigo] = useState('');

    return (
        <header className="main-header">
            <div className="logo">
                <h1>MeteoApi</h1>
            </div>
            
            <nav className="search-bar">
                <Input
                    name="codigo"
                    type="text" 
                    placeholder="Código mun (ej: 30030)" 
                    onChange={(e) => setCodigo(e.target.value)} 
                />
                <Button onClick={() => onSearch(codigo)}>Buscar</Button>
            </nav>

            {/* Agrupamos el Toggle y la Fecha a la derecha para que el diseño flexbox siga funcionando bien */}
            <div className="header-info">
                <Toggle />
                <span>{new Date().toLocaleDateString()}</span>
            </div>
        </header>
    );
}

export default Header;
