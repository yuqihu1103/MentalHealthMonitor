// Import required modules and User model
import express from "express";
import UserModel from "../models/users";
import bcrypt from "bcrypt";

// Create an Express router
const router = express.Router();

router.post('/test', async (req, res) => {
    console.log("reached here")
    console.log(req.body)
});

module.exports = router;