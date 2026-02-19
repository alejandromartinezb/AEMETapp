import './Footer.css';

function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} MeteoApp - Datos obtenidos de <a href="https://opendata.aemet.es" target="_blank" rel="noopener noreferrer">AEMET OpenData</a></p>
                <div className="footer-links"> {/* Clase no declarada en css (de momento) */}
                    <p>Alejandro Martínez Bravo - <a href="https://cifpcarlos3.es/es" target="_blank">CIFP Carlos III</a></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;