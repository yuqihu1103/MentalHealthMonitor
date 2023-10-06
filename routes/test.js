// Import required modules and User model
import express from "express";
import UserModel from "../models/users";
import bcrypt from "bcrypt";

// Create an Express router
const router = express.Router();

router.post("/test", async (req, res) => {
  //console.log("reached here")
  //console.log(req.body)
  const { user, testType, testScore, severity, time } = req.body;

  const testData = {
    user,
    testType,
    testScore,
    severity,
    time,
  };

  // Create the test result in the database
  try {
    await createTestResult(user);
    res.status(201).json({ message: "Test completed successful"});
    //console.log("created test")
  } catch (error) {
    console.error("Error storing test result:", error);
    res.status(500).json({ error: "Test score was not saved" });
  }
});

module.exports = router;
