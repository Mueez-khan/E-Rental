const express = require("express");
const router = express.Router();

const {register , login , sendOtp} = require("../controllers/UserController");


router.post("/register" , register);

// Route for sending otp

router.post("/otp" , sendOtp);

// Route for login

router.post("/login" , login);

module.exports = router;