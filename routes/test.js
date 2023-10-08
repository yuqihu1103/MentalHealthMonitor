// Import required modules and User model
const express = require("express");
const testResultModel = require("../models/test_result");

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
    await testResultModel.createTestResult(testData);
    res.status(201).json({ message: "Test completed successful" });
    //console.log("created test")
  } catch (error) {
    console.error("Error storing test result:", error);
    res.status(500).json({ error: "Test score was not saved" });
  }
});

module.exports = router;
