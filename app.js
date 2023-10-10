const express = require("express");
const { connectToDatabase } = require("./db/db");
const bodyParser = require("body-parser");
const path = require("path");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const testRoute = require("./routes/test");

const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Use the registration route
app.post("/register", registerRoute);
app.post("/login", loginRoute);

// Your other routes and middleware go here
app.post("/test", testRoute);

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectToDatabase();
module.exports = app;
