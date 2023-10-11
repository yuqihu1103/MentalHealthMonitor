// Import required modules and User model
import express from "express";
import {createTestResult} from "../models/test_result.js";

// Create an Express router
const router = express.Router();

router.post("/test", async (req, res) => {
  //console.log("reached here")
  //console.log(req.body)
  const { user, testType, testScore, severity, time } = req.body;
  console.log("Test Score:", testScore); // <-- This line logs the test score

  const testData = {
    user,
    testType,
    testScore,
    severity,
    time,
  };

  // Create the test result in the database
  try {
    await createTestResult(testData);
    res.status(201).json({ message: "Test completed successful" });
    //console.log("created test")
  } catch (error) {
    console.error("Error storing test result:", error);
    res.status(500).json({ error: "Test score was not saved" });
  }
});

export default router;
