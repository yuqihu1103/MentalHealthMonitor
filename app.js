const express = require("express");
const session = require("express-session");
const { connectToDatabase } = require("./db/db");
const bodyParser = require("body-parser");
const path = require("path");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const testRoute = require("./routes/test");
const { getTestResultsByUserId } = require("./models/test_result");

const app = express();

//enable session
app.use(
  session({
    secret: "mental-health-monitor",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.username) {
    return next();
  }
  res.redirect("/login");
}

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Use the routes
app.post("/register", registerRoute);
app.post("/login", loginRoute);
app.post("/test", testRoute);

//get-username route
app.get("/get-username", isAuthenticated, (req, res) => {
  const username = req.session.username;
  if (username) {
    res.json({ username });
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

//app.get("/get-history", isAuthenticated, (req, res) => {
 // const username = req.session.username;

  //const history_data = await getTestResultsByUsername(username)
  
  //let history_data = [{},]
  //res.json({ history_data });
//})

//logout route
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectToDatabase();
module.exports = app;
