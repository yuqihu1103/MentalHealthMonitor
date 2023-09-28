// User-related database operations

const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/db');

// Define the User schema
const userSchema = {
  username: String,
  email: String,
  password: String,
};

// Create a User model
const UserModel = {
  async createUser(user) {
    const db = getDatabase();
    const result = await db.collection('users').insertOne(user);
    return result.insertedId;
  },

  async getUserById(id) {
    const db = getDatabase();
    return db.collection('users').findOne({ _id: ObjectId(id) });
  },

  async getUserByEmail(email) {
    const db = getDatabase();
    return db.collection('users').findOne({ email });
  },

  async updateUser(id, updatedUser) {
    const db = getDatabase();
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(id) },
      { $set: updatedUser }
    );
    return result.modifiedCount;
  },

  async deleteUser(id) {
    const db = getDatabase();
    const result = await db.collection('users').deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
  },
};

module.exports = UserModel;
