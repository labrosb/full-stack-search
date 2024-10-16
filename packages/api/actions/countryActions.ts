import { Request, Response } from 'express';
import { connectToDatabase } from '../db/startAndSeedMemoryDB';

// Function fetches a single country by ISO code
export const getCountryByIsoCode = async (req: Request, res: Response): Promise<void> => {
  const { isoCode } = req.params;

  // Validate the ISO code
  if (isoCode.length !== 2) {
    res.status(400).send('Invalid ISO country code');
    return;
  }

  try {
    // TODO: Handle this for different environments
    const db = await connectToDatabase();
    // Find the country
    const country = await db.collection<Country>('countries').findOne(
      { countryisocode: isoCode },
      {
        projection: {
          name:  '$country',
          _id: 0 
        }
      },
    );

    if (!country) {
      res.status(404).send('Country not found');
      return;
    }
  
    res.send(country);
  } catch (error) {
    console.error(`Error fetching country with ISO code ${isoCode} :`, error);

    res.status(500).send('Error fetching country');
  }
};
