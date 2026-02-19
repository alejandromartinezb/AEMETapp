import app from './src/app.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;

dotenv.config();

app.listen(PORT, () => {
    console.log(`Backend escuchando en el puerto: ${PORT}`);
});
