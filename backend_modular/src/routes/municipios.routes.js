import { Router } from 'express';

const router = Router();


router.get('/api/municipios', async (req, res) => {
  try {
    const apiKey = process.env.AEMET_API_KEY;
    const aemetBase = process.env.AEMET_BASE;
    // He añadido la URL a mi .env como variable de entorno
    // AEMET_BASE=https://opendata.aemet.es/opendata/api

    const url = `${aemetBase}/maestro/municipios/?api_key=${apiKey}`;

    // Primera petición que devuelve los municipios
    const firstResponse = await fetch(url);

    // Verificar si la respuesta es correcta
    if (!firstResponse.ok) {
      throw new Error(`Error en la API AEMET: ${firstResponse.status}`);
    }

    // Convertir respuesta a JSON
    const firstData = await firstResponse.json();

    // Si el estado no es 200, AEMET te está enviando un error detallado en el JSON
    if (firstData.estado !== 200) {
      return res.status(firstData.estado).json({ error: firstData.descripcion });
    }

    // Segunda petición al json
    const dataResponse = await fetch(firstData.datos);

    if (!dataResponse.ok) {
      throw new Error(`Error en la petición a los datos: ${dataResponse.status}`);
    }

    const municipios = await dataResponse.json();

    res.json(municipios);

  } catch (error) {
    console.error('Error al consultar la API:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los datos de la API externa',
      detalles: error.message
    });
  }
});


export default router;