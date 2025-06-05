"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // ⬅️ Añadido
const db_1 = require("./db");
const getProducts_1 = require("./getProducts");
const app = (0, express_1.default)();
const PORT = 3000;
// 🛡️ Habilitar CORS (permite todas las peticiones CORS)
app.use((0, cors_1.default)());
// O bien, restringe a tu frontend solo:
// app.use(cors({
//   origin: 'https://jubilant-space-waffle-9wr4w474w9ghx99r-8080.app.github.dev'
// }));
app.use(express_1.default.json());
app.get('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Connecting to database");
        const db = yield (0, db_1.connectToDatabase)();
        const products = yield (0, getProducts_1.getProducts)(db, 'collection'); // Asegúrate del nombre real de la colección
        res.json(products);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}));
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo dd en http://localhost:${PORT}`);
});
