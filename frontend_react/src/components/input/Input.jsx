import './Input.css';

function Input({
    name = "",
    type = 'text',
    placeholder = 'Escribe aquí',
    onChange 
}) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}

export default Input;