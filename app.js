import express from "express";
import { connectToDatabase } from "./db/db.js";
import bodyParser from "body-parser";
import path from "path";
import registerRoute from "./routes/register.js";
import testRoute from "./routes/test.js";
import loginRoute from "./routes/login.js";

const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Use the registration route
app.post("/register", registerRoute);
app.post("/test", testRoute);
app.post("/login", loginRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectToDatabase();
