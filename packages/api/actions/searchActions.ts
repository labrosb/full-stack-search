import { Request, Response } from 'express';
import { connectToDatabase } from '../db/startAndSeedMemoryDB';

// Function fetches a single hotel by ID
export const getMultiSearchResults = async (req: Request, res: Response): Promise<void> => {
  const searchTerm = req.query.searchTerm ? String(req.query.searchTerm).toLowerCase() : '';

  if (!searchTerm) {
    res.status(400).send('Invalid search term');
    return;
  }

  try {
    const db = await connectToDatabase();

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
  }
};
