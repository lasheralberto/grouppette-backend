// getComments.ts
import { Db } from 'mongodb';

// getComments.js
export async function getComments(db:any, collectionName:string, productId:string) {
    const collection = db.collection(collectionName);
    const comments = await collection.find({ productId }).toArray();
    return comments;
}

// Versión alternativa si prefieres usar directamente la colección 'comments'
export async function getCommentsByProductId(db:any, productId:string) {
    const collection = db.collection('comments');
    const comments = await collection.find({ productId }).toArray();
    return comments;
}