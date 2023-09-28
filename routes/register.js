// Import required modules and User model
const express = require('express');
const UserModel = require('../models/user');

// Create an Express router
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  // Retrieve user data from the request body
  const { username, email, password } = req.body;

  // Implement server-side validation here
  // Example: Check if username, email, and password meet your validation criteria
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

  // Hash the password (you should use a password hashing library like bcrypt)
  // For simplicity, we won't hash the password in this example

  // Create a user object
  const user = {
    username,
    email,
    password, // Remember to hash this password
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

// Export the router
module.exports = router;
