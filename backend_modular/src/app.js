import express from 'express';
import cors from 'cors';


// Importar rutas
import municipiosRoutes from './routes/municipios.routes.js';
import provinciasRoutes from './routes/provincias.routes.js';
import prediccionProvinciaHoyRoutes from './routes/prediccionProvinciaHoy.routes.js';
import prediccionMunicipioHoyRoutes from './routes/prediccionMunicipioHoy.routes.js';

// app tiene toda la interfaz de express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', municipiosRoutes);
app.use('/', provinciasRoutes);
app.use('/', prediccionProvinciaHoyRoutes);
app.use('/', prediccionMunicipioHoyRoutes);

// Middleware para rutas no encontradas y errores
app.use((req, res) => {
    res.status(404).json({
        mensaje: 'No encontrado.'
    });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Error en el servidor, pruébalo más adelante.'
    });
});

export default app;
