// insertComment.ts
import { Db, ObjectId } from 'mongodb';

type Comment = {
  id: number;
  user: string;
  rating: number;
  date: Date;
  comment: string;
  verified: boolean;
};

export async function insertReview(
  db: Db,
  collectionName: string,
  commentData: Omit<Comment, '_id'>
) {
  const collection = db.collection(collectionName);

  const document = {
    _id: new ObjectId(), // puedes también permitir que Mongo lo genere solo
    ...commentData,
  };

  const result = await collection.insertOne(document);
  return result;
}
