const mongoose = require("mongoose");


const PropertySchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensure price is non-negative
    },
    description: {
        type: String,
        required: true,
        maxlength: 500 // Limit the description length
    },
    images: [{
        type: String,
        required: true
    }],
    perks: {
        type: [String], // Array of strings for multiple perks (e.g., "Free WiFi", "Parking")
        default: []
    },
    aboutPlace: {
        type: String,
        required: true,
        maxlength: 1000 // Limit the about section length
    },
    guestDetails: {
        
            type: Number,
            required: true,
            min: 1 // Ensure at least one guest
        
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation date
    }
});

const PlotSchema = mongoose.model('Property', PropertySchema);
module.exports = PlotSchema;
