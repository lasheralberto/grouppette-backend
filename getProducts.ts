// getProducts.ts
import { Db } from 'mongodb';

export async function getProducts(db: Db, collectionName: string) {
    const collection = db.collection(collectionName);
    const products = await collection.find({}).toArray();
    return products;
}
