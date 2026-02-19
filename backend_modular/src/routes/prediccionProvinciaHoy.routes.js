import { Router } from "express";

const router = Router();

// Ruta para obtener la predicción narrativa de una provincia (ej: /api/prediccion/28)
router.get('/api/prediccion/:provincia', async (req, res) => {
  try {
    const { provincia } = req.params;
    const apiKey = process.env.AEMET_API_KEY;
    const aemetBase = process.env.AEMET_BASE;

    // 1. Petición inicial para obtener la URL temporal de los datos
    const url = `${aemetBase}/prediccion/provincia/hoy/${provincia}/?api_key=${apiKey}`;
    const firstResponse = await fetch(url);

    if (!firstResponse.ok) {
      throw new Error(`Error conexión AEMET: ${firstResponse.status}`);
    }

    const firstData = await firstResponse.json();

    // Validamos el estado interno de la respuesta de AEMET
    if (firstData.estado !== 200) {
      return res.status(firstData.estado).json({ 
        success: false, 
        error: firstData.descripcion 
      });
    }

    // 2. Segunda petición a la URL de 'datos'
    const dataResponse = await fetch(firstData.datos);
    
    if (!dataResponse.ok) {
      throw new Error(`Error al descargar el contenido: ${dataResponse.status}`);
    }

    /**
     * IMPORTANTE: Las predicciones provinciales de AEMET son TEXTO PLANO
     * codificado en ISO-8859-15. Usamos arrayBuffer para decodificarlo bien.
     * arrayBuffer no procesa los datos (los mantiene raw)
     */
    const buffer = await dataResponse.arrayBuffer();
    const decoder = new TextDecoder('iso-8859-15');
    const textoPrediccion = decoder.decode(buffer);

    // Devolvemos el texto al cliente
    res.json({
      success: true,
      provincia: provincia,
      prediccion: textoPrediccion
    });

  } catch (error) {
    console.error('Error en el servidor:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error al procesar la predicción meteorológica',
      detalles: error.message
    });
  }
});

export default router;
