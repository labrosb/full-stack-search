import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient } from "mongodb";

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors())
app.use(express.json());

app.get('/multi-search', async (req: Request, res: Response) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  const searchTerm = req.query.q ? String(req.query.q).toLowerCase() : '';
  console.log('Connecting to MongoDB...');

  try {
    await mongoClient.connect();
    const db = mongoClient.db();

    console.log('Successfully connected to MongoDB!');

    const [hotels, countries, cities] = await Promise.all([
      db.collection<Hotel>('hotels').find({
        $or: [
          { chain_name: { $regex: searchTerm, $options: 'i', $ne: 'No chain' } },
          { hotel_name: { $regex: `^${searchTerm}`, $options: 'i' } },
          { country: { $regex: `^${searchTerm}`, $options: 'i' } },
          { city: { $regex: `^${searchTerm}`, $options: 'i' } },
        ],
      },
      {
        projection: {
          id: '$_id',
          name: '$hotel_name',
          chain: '$chain_name',
          _id: 0,
        },
      }).toArray(),
      db.collection<Country>('countries').find({
        country: { $regex: `^${searchTerm}`, $options: 'i' },
      },
      {
        projection: {
          id: '$_id',
          name: '$country',
          isoCode: '$countryisocode',
          _id: 0,
        },
      }).toArray(),
      db.collection<City>('cities').find({
        name: { $regex: `^${searchTerm}`, $options: 'i' },
      },
      {
        projection: {
          id: '$_id',
          name: 1,
          _id: 0,
        },
      }).toArray(),
    ]);

    res.send({ hotels, countries, cities });
  
  } catch (error) {
    console.error('Error in /multi-search:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  } finally {
    await mongoClient.close();
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
});
