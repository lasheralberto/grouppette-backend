// db.ts
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {

    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI environment variable is not defined');
    }

    if (cachedDb) {
        return cachedDb;
    }

    const client = new MongoClient(uri, {
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
    });

    try {
        await client.connect();
        const db = client.db('groupettedb');
        cachedDb = db;
        return db;
    } catch (e) {
        console.error('Error conectando a MongoDB:', e);
        throw e;
    }
}
