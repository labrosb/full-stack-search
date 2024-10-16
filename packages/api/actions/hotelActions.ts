import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../db/startAndSeedMemoryDB';

// Function fetches a single hotel by ID
export const getHotelById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate the ID
  if (!ObjectId.isValid(id)) {
    res.status(400).send('Invalid hotel ID format');
    return;
  }  

  try {
    const db = await connectToDatabase();
    // Find the hotel
    const hotel = await db.collection<Hotel>('hotels').findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          name:  '$hotel_name',
          chain: '$chain_name',
          addressLine1: '$addressline1',
          addressLine2: '$star_rating',
          zipcode: '$zipCode',
          starRating: '$star_rating',
          city: 1,
          state: 1,
          country:1,
          _id: 0 
        }
      },
    );

    if (!hotel) {
      res.status(404).send('Hotel not found');
      return;
    }
    // Regulating chain value
    if (hotel.chain === 'No chain') {
      hotel.chain = '';
    } 

    res.send(hotel);

  } catch (error) {
    console.error(`Error fetching hotel with id ${id} :`, error);

    res.status(500).send('Error fetching hotel');
  }
};
