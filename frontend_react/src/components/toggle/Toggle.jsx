import { useState, useEffect } from 'react';
import './Toggle.css';

const Toggle = () => {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark'); // Usa 'dark' para body.dark
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <div className="theme-switch-wrapper">
            <span className="theme-icon-label">{isDark ? '🌙' : '☀️'}</span>
            <label className="theme-switch">
                <input
                    type="checkbox"
                    onChange={() => setIsDark(!isDark)}
                    checked={isDark}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default Toggle;
