const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const dbConnection = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const plotRoutes = require('./routes/plotRoutes'); // Import plot routes
const  bookingRoutes = require('./routes/PlotBookingRoutes'); 
const  dashBoardRoutes = require('./routes/dashboardRoute'); 
const { cloudinaryConnection  } = require('./config/cloudinary'); // Import Cloudinary connection
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true
}));


cloudinaryConnection();

dotenv.config(); // Load environment variables

// Middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnection();

// Routes
app.use("/api/v1", userRoutes); // User-related routes
app.use("/api/v1/plots", plotRoutes); // Plot-related routes
app.use("/api/v1/property", bookingRoutes); // Plot-booking route
app.use("/api/v1/dashboard", dashBoardRoutes); // Plot-booking route

// Home route
app.get("/", (req, res) => {
    res.send("The app is running fine");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
