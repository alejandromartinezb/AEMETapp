import { Router } from "express";
import provinciasData from "../data/provincias.json" with { type: "json" };

const router = Router();

// Ruta para obtener el listado de provincias
router.get('/api/provincias', (req, res) => {
  // Puedes devolverlo todo directamente
  res.json(provinciasData);
});

// Ruta para buscar una provincia por nombre (opcional)
router.get('/api/provincias/buscar', (req, res) => {
  const { nombre } = req.query;
  if (!nombre) return res.status(400).json({ error: "Falta el nombre" });

  const filtradas = provinciasData.filter(p => 
    p.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
  
  res.json(filtradas);
});

export default router;
