import { MongoClient } from "mongodb";

let uri;
// Check if process.env.MONGODB_URI is defined and use it, 
//or use the local URI as a fallback
if (process.env.MONGODB_URI) {
  uri = process.env.MONGODB_URI;
} else {
  uri = "mongodb://127.0.0.1:27017";
}

const dbName = "MentalHealthMonitor";
const client = new MongoClient(uri);

let database;
async function connectToDatabase() {
  //console.log("Mongo connecting to", uri);
  try {
    database = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error with db connection", error);
  }
}

function getDatabase() {
  return database;
}

export {
  connectToDatabase,
  getDatabase,
};

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
