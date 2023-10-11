import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "MentalHealthMonitor";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

async function connectToDatabase() {
  try {
    await client.connect();
    database = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error with db connection", error);
  }
}

function getDatabase() {
  return database;
}

export { connectToDatabase, getDatabase };


// connectToDatabase();
// Replace the uri string with your connection string.
// // db.js// const { MongoClient } = require("mongodb");// const dbName = "MentalHealthMonitor";// const url = `mongodb://localhost:27017`;
// const client = new MongoClient(url);// async function connectToDatabase() {
//   try {
//     console.log("Connecting to ", url);
//     await client.connect();
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }
