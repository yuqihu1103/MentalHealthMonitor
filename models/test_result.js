//moved your work with test_result here
async function insertTestResult(data) {
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