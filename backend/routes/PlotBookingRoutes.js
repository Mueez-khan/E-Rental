const express = require('express');
const router = express.Router();
const {authenticateUser} = require("../middlewares/UserMiddleware");
const {createBooking} = require("../controllers/PlotBookingController");

// Route for creating a plot with multiple image uploads
router.post("/booking", authenticateUser,createBooking);

module.exports = router;
