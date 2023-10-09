const app = require("../app.js"); // Replace with the actual path to your app.js
const PORT = process.env.TEST_PORT || 3001; // Use a different port for tests

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in test mode`);
});

module.exports = server; // Export the HTTP server instance
