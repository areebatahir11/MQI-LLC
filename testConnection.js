// testConnection.js
import { MongoClient } from "mongodb";

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect(); // try to connect
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await client.close(); // always close the connection
  }
}

testConnection();