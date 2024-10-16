import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, Db } from "mongodb";
import { cities } from "db/seeds/cities.js";
import { countries } from "./seeds/countries";
import { hotels } from "./seeds/hotels";

const mongod = await MongoMemoryServer.create({
  instance: {
    port: 3002,
  }
});

const uri = process.env.DATABASE_URL || mongod.getUri();

const client = new MongoClient(uri);

console.log("MongoMemoryServer started on", uri);

let db: Db;
let isConnected = false;

const initClient = async () => {
  try {
    await client.connect();

    db = client.db();
    await db.collection("cities").insertMany(cities);
    await db.collection("countries").insertMany(countries);
    await db.collection("hotels").insertMany(hotels);
    // Add indexes
    await db.collection("hotels").createIndex({ hotel_name: 1 });
    await db.collection("hotels").createIndex({ chain_name: 1 });
    await db.collection("hotels").createIndex({ city: 1 });
    await db.collection("hotels").createIndex({ country: 1 });
    await db.collection('countries').createIndex({ country: 1 });
    await db.collection('countries').createIndex({ countryisocode: 1 }, { unique: true });
    await db.collection('cities').createIndex({ name: 1 });
  
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

await initClient();

export const connectToDatabase = async () => {
  try {
    if (!db) {
      await initClient();
      isConnected = true;
      console.log('Succesfully initialized MongoDB client');
      return db;
    }
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log('Succesfully reconnected to MongoDB');
    }

    return db;

  } catch (error) {
    // TODO: Make repeated attemts with MAX
    console.log('Error: Client not connected');
    throw error;
  }
};

client.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  isConnected = false;
  connectToDatabase();
});

client.on('serverClosed', (event) => {
  console.log('MongoDB server closed:', event);
  isConnected = false;
});

process.on('SIGTERM', async () => {
  isConnected = false;
  await client.close();
  await mongod.stop();
  process.exit(0);
});