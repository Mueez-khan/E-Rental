const express = require('express');
const router = express.Router();
const {userDetail } = require("../controllers/dashboard");

// Route for creating a plot with multiple image uploads
router.post("/allUser",  userDetail );

module.exports = router;
