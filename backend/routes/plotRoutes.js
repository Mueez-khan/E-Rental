const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer"); // Multer middleware for handling file uploads
const { createPlot , showAllPlots , getPlotById , DeletePlot , updatePlot , getPaginatedPlots , getPlotsByUser , recentProperty} = require("../controllers/plotController");
// const { } = require("../controllers/PlotController");
// const { } = require("../controllers/PlotController");
const {authenticateUser} = require("../middlewares/UserMiddleware");
// Route for creating a plot with multiple image uploads


router.post("/create", upload.array("images", 10) , authenticateUser, createPlot);
router.get("/allPlots" , showAllPlots );
router.get("/recentProperty" , recentProperty );
router.get("/:id" ,  getPlotById);
router.get("/" ,  getPaginatedPlots);
router.get("/dashboard/:id" , authenticateUser,  getPlotsByUser);
router.delete("/:id" , authenticateUser , DeletePlot);
router.put("/update/:id" , upload.array("images", 10) ,  authenticateUser , updatePlot);
module.exports = router;
