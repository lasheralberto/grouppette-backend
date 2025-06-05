import express from 'express';
import cors from 'cors'; // ⬅️ Añadido
import { connectToDatabase } from './db';
import { getProducts } from './getProducts';

const app = express();
const PORT = 3000;

// 🛡️ Habilitar CORS (permite todas las peticiones CORS)
app.use(cors());

// O bien, restringe a tu frontend solo:
// app.use(cors({
//   origin: 'https://jubilant-space-waffle-9wr4w474w9ghx99r-8080.app.github.dev'
// }));

app.use(express.json());

app.get('/api/products', async (req, res) => {
  try {
    console.log("Connecting to database");
    const db = await connectToDatabase();
    const products = await getProducts(db, 'collection'); // Asegúrate del nombre real de la colección
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo dd en http://localhost:${PORT}`);
});
