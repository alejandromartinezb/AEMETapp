import { Router } from "express";

const router = Router();

// Ruta para obtener la predicción diaria de un municipio (ej: /api/prediccion/municipio/28079)
router.get('/api/prediccion/municipio/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apiKey = process.env.AEMET_API_KEY;
    const aemetBase = process.env.AEMET_BASE;

    // 1. Validación de seguridad: AEMET requiere códigos de 5 dígitos (ej: 28079)
    if (!id || id.length !== 5) {
      return res.status(400).json({
        success: false,
        error: "Código de municipio no válido. Debe tener 5 dígitos (ej: 28079 para Madrid)."
      });
    }

    // 2. Primera petición para obtener la URL de los datos
    const url = `${aemetBase}/prediccion/especifica/municipio/diaria/${id}/?api_key=${apiKey}`;
    const firstResponse = await fetch(url);

    if (!firstResponse.ok) {
      throw new Error(`Error de conexión AEMET: ${firstResponse.status}`);
    }

    const firstData = await firstResponse.json();

    // 3. Validar el estado interno de AEMET (aquí capturamos el 404 que viste en Swagger)
    if (firstData.estado !== 200) {
      return res.status(firstData.estado).json({
        success: false,
        error: firstData.descripcion || "No hay datos para este municipio"
      });
    }

    // 4. Segunda petición para obtener el JSON real con la meteorología
    const dataResponse = await fetch(firstData.datos);

    if (!dataResponse.ok) {
      throw new Error(`Error al descargar datos finales: ${dataResponse.status}`);
    }

    const meteorologia = await dataResponse.json();

    // 5. Respuesta exitosa al cliente
    res.json({
      success: true,
      municipioId: id,
      data: meteorologia
    });

  } catch (error) {
    console.error('Error en predicción municipal:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error interno al obtener la predicción',
      detalles: error.message
    });
  }
});

export default router;
