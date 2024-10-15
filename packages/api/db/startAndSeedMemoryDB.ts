import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { cities } from "db/seeds/cities.js";
import { countries } from "./seeds/countries";
import { hotels } from "./seeds/hotels";

const mongod = await MongoMemoryServer.create({
  instance: {
    port: 3002,
  }
});
console.log("MongoMemoryServer started on", mongod.getUri());

const uri = mongod.getUri();

process.env.DATABASE_URL = uri;

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db();
  await db.collection("cities").insertMany(cities);
  await db.collection("countries").insertMany(countries);
  await db.collection("hotels").insertMany(hotels);
  // Add indexes
  await db.collection("hotels").createIndex({ hotel_name: 1 });
  await db.collection("hotels").createIndex({ chain_name: 1 });
  await db.collection("hotels").createIndex({ city: 1 });
  await db.collection("hotels").createIndex({ country: 1 });
  await db.collection('countries').createIndex({ country: 1 });
  await db.collection('cities').createIndex({ name: 1 });

} catch (error) {
  console.error("Error seeding database:", error);
} finally {
  await client.close();
}

process.on('SIGTERM', async () => {
  await mongod.stop();
  process.exit(0);
});
