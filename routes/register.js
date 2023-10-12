// Import required modules and User model
import express from "express";
import UserModel from "../models/users.js";
import bcrypt from "bcryptjs";

// Create an Express router
const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  //console.log('POST request to /register received');
  const { username, email, password } = req.body;
  //console.log('Username:', username);
  //console.log('Email:', email);
  //console.log('Password:', password);

  // server-side validation of username, email, and password
  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Enter a valid email address" });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  // Check if the email is already registered
  const existingUser = await UserModel.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "Email is already registered" });
  }

  // Check if the username is already registered
  const existingUser2 = await UserModel.getUserByUsername(username);
  if (existingUser2) {
    return res.status(400).json({ error: "Username is already registered" });
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
    res.status(201).json({ message: "Registration successful", userId });
    //console.log("created user")
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
