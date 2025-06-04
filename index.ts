// server.ts
import express from 'express';
import { connectToDatabase } from './db';
import { getProducts } from './getProducts';

const app = express();
const PORT =  3000;

app.use(express.json());

app.get('/api/products', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const products = await getProducts(db, 'collection'); // Asegúrate de que "products" es el nombre de tu colección
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
