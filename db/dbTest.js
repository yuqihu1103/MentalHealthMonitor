const {
  connectToDatabase,
  insertTestResult,
  getTestResultsByUserId,
} = require("./db.js");

async function testDatabaseOperations() {
  await connectToDatabase();

  // Insert a test result
  const testData = {
    userid: "user123",
    score: 8,
    timeLen: "5 minutes",
    type: "depression",
  };

  const insertResult = await insertTestResult(testData);
  console.log("Insert Result:", insertResult);

  // Fetch test results for the user
  const userResults = await getTestResultsByUserId("user123");
  console.log("User Results:", userResults);
}

testDatabaseOperations();
