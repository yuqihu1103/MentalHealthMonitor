const express = require('express');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/register'); // Adjust the path to your register route file

const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Use the registration route
app.use('/api', registerRoute); // You can adjust the base URL ("/api") as needed

// Your other routes and middleware go here

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
