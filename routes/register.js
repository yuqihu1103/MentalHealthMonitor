// Import required modules and User model
const express = require('express');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

// Create an Express router
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // server-side validation of username, email, and password
  if (!username || username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  // Check if the email is already registered
  const existingUser = await UserModel.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email is already registered' });
  }

  // Hash the password
  const saltRounds = 10; // You can configure the number of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create a user object
  const user = {
    username,
    email,
    password: hashedPassword,
  };

  // Create the user in the database
  try {
    const userId = await UserModel.createUser(user);
    res.status(201).json({ message: 'Registration successful', userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
