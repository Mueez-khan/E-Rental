const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    plot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlotSchema', // Reference to the plot being booked
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who booked the plot
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the plot owner
        required: true
    },
    userDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
