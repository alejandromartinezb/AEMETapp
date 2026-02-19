import { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ options, onSelect, label = "Selecciona una opción" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    return (
        <div className="dropdown-container">
            <button onClick={toggleDropdown} className="dropdown-button">
                {selectedOption ? selectedOption.nombre : label}
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <ul className="dropdown-menu">
                    {options && options.map((option, index) => (
                        <li
                            key={option.id + index}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
