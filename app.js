import express from "express";
import session from "express-session";
import { connectToDatabase } from "./db/db.js";
import bodyParser from "body-parser";
import path from "path";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import testRoute from "./routes/test.js";
import { getTestResultsByUsername } from "./models/test_result.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

//get-history route
app.get("/get-history", isAuthenticated, async (req, res) => {
  const username = req.session.username;

  try {
    const history_data = await getTestResultsByUsername(username);
    //console.log(history_data);
    res.json({ history_data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching history data." });
  }
});

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
export default app;
