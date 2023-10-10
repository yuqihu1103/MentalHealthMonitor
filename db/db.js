const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
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
function getDatabase() {
  return database;
}
module.exports = {
  connectToDatabase,
  getDatabase,
};
// connectToDatabase();
