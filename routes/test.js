// Import required modules and User model
const express = require('express');
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');

// Create an Express router
const router = express.Router();

router.post('/test', async (req, res) => {
    console.log("reached here")
    console.log(req.body)
});

module.exports = router;