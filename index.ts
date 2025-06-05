import express from 'express';
import cors from 'cors'; // ⬅️ Añadido
import { connectToDatabase } from './db';
import { getProducts } from './getProducts';
import { insertReview } from './insertReview'; // Asegúrate de la ruta correcta
import { getComments } from './getReviews';

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

// GET comentarios por ID de producto
app.get('/api/comments/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    
    const db = await connectToDatabase();
    // Asumiendo que tienes tu instancia de db disponible
    const comments = await getComments(db, 'comments', productId);
    
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

app.post('/api/comments', async (reqe, rese) => {
  try {
    console.log('Connecting to database');
    const db = await connectToDatabase();

    const { id, user, rating, date, comment, verified } = reqe.body;

    if (
      typeof id !== 'number' ||
      typeof user !== 'string' ||
      typeof rating !== 'number' ||
      typeof comment !== 'string' ||
      typeof verified !== 'boolean'
    ) {
      //return rese.status(400).json({ error: 'Datos inválidos en la solicitud' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      //return rese.status(400).json({ error: 'Fecha inválida' });
    }

    const result = await insertReview(db, 'comentarios', {
      id,
      user,
      rating,
      date: parsedDate,
      comment,
      verified
    });

    rese.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('Error al insertar comentario:', error);
    rese.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo dd en http://localhost:${PORT}`);
});
