import React from 'react';
import './PronosticoTabla.css';

const PronosticoTabla = ({ weatherData }) => {
  if (!weatherData?.data?.[0]?.prediccion?.dia) {
    return <div className="error-msg">Cargando datos meteorológicos...</div>;
  }

  const municipio = weatherData.data[0];
  const dias = municipio.prediccion.dia;

  // Lógica para buscar el primer estado de cielo que no esté vacío (En los períodos que ya han pasado, los datos suelen estar vacíos)
  const getValidStatus = (estadoCieloArray) => {
    if (!estadoCieloArray) return "N/A";
    
    // Buscamos el primero que tenga una descripción con texto
    const estadoValido = estadoCieloArray.find(estado => estado.descripcion && estado.descripcion.trim() !== "");
    
    return estadoValido ? estadoValido.descripcion : "Despejado / Sin datos";
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-ES', { 
      weekday: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="weather-container">
      <header className="weather-header">
        <div className="header-info">
          <h2>{municipio.nombre}</h2>
          <p className="provincia">{municipio.provincia}</p>
        </div>
        <span className="elaborado">Ref: {new Date(municipio.elaborado).toLocaleDateString()}</span>
      </header>

      <div className="table-wrapper">
        <table className="weather-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Temp (Máx/Mín)</th>
              <th>Humedad</th>
              <th>Viento</th>
              <th>UV</th>
            </tr>
          </thead>
          <tbody>
            {dias.map((dia, index) => (
              <tr key={index}>
                <td className="date-cell">{formatDate(dia.fecha)}</td>
                <td className="status-cell">
                  {getValidStatus(dia.estadoCielo)}
                </td>
                <td className="temp-cell">
                  <span className="t-max">{dia.temperatura.maxima}°</span>
                  <span className="t-min">{dia.temperatura.minima}°</span>
                </td>
                <td className="hum-cell">
                  {dia.humedadRelativa.maxima}% / {dia.humedadRelativa.minima}%
                </td>
                <td className="wind-cell">
                  {/* Buscamos también el primer viento con velocidad disponible */}
                  {dia.viento?.[0]?.direccion} {dia.viento?.[0]?.velocidad} <small>km/h</small>
                </td>
                <td>
                  <span className={`uv-badge uv-${dia.uvMax}`}>
                    {dia.uvMax}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <footer className="weather-footer">
        <p>AEMET - <a href={municipio.origen.enlace} target="_blank" rel="noreferrer">Info. oficial</a></p>
      </footer>
    </div>
  );
};

export default PronosticoTabla;
