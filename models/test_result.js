const { getDatabase } = require("./db.js");

async function createTestResult(data) {
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

async function updateTestResultById(testResultId, updatedData) {
  const db = getDatabase();
  const testResultsCollection = db.collection("testResults");

  try {
    const result = await testResultsCollection.updateOne(
      { _id: testResultId },
      { $set: updatedData }
    );
    if (result.matchedCount === 0) {
      console.error("No test result found with the given ID.");
      return null;
    }
    console.log(`Updated Test Result with ID ${testResultId}`);
    return result;
  } catch (error) {
    console.error("Error updating test result:", error);
  }
}

async function deleteTestResultById(testResultId) {
  const db = getDatabase();
  const testResultsCollection = db.collection("testResults");

  try {
    const result = await testResultsCollection.deleteOne({ _id: testResultId });
    if (result.deletedCount === 0) {
      console.error("No test result found with the given ID.");
      return null;
    }
    console.log(`Deleted Test Result with ID ${testResultId}`);
    return result;
  } catch (error) {
    console.error("Error deleting test result:", error);
  }
}

module.exports = {
  createTestResult,
  getTestResultsByUserId,
  updateTestResultById,
  deleteTestResultById,
};
