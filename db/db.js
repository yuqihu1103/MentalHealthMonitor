// db.js

const { MongoClient } = require("mongodb");

const dbName = "MentalHealthMonitor";

const uri = `mongodb://localhost:27017/${dbName}`;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getDatabase() {
  return client.db(dbName);
}

async function insertTestResult(data) {
  const db = getDatabase();
  const testResultsCollection = db.collection("testResults");

  try {
    const result = await testResultsCollection.insertOne(data);
    console.log(`Inserted Test Result with ID ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error("Error inserting test result:", error);
  }
}

async function getTestResultsByUserId(userId) {
  const db = getDatabase();
  const testResultsCollection = db.collection("testResults");

  try {
    const results = await testResultsCollection
      .find({ userid: userId })
      .toArray();
    return results;
  } catch (error) {
    console.error("Error fetching test results:", error);
  }
}

module.exports = {
  connectToDatabase,
  getDatabase,
  insertTestResult,
  getTestResultsByUserId,
};
