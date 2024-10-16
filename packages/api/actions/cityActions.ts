import { Request, Response } from 'express';
import { ObjectId } from "mongodb";
import { connectToDatabase } from '../db/startAndSeedMemoryDB';

// Function fetches a single city by ID
export const getCityById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate the ID
  if (!ObjectId.isValid(id)) {
    res.status(400).send('Invalid city ID format');
    return;
  }

  try {
    const db = await connectToDatabase();
    // Find the city
    const city = await db.collection<City>('cities').findOne(
      { _id: new ObjectId(id) },
    );

    if (!city) {
      res.status(404).send('City not found');
      return;
    }

    res.send(city);
  } catch (error) {
    console.error(`Error fetching city with id ${id} :`, error);

    res.status(500).send('Error fetching city');
  }
};
