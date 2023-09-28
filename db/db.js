// db.js

const { MongoClient } = require('mongodb');

const dbName = "MentalHealthMonitor"

const uri = `mongodb://localhost:27017/${dbName}`;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDatabase() {
  return client.db(dbName);
}

module.exports = { connectToDatabase, getDatabase };
