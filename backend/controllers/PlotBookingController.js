const Booking = require("../models/PlotBookingSchema");
const PlotSchema = require("../models/PlotSchema");
const User = require("../models/userSchema");
const mailSend = require("../utils/mailSender");
const { bookingConfirmationEmail, bookingNotificationEmail } = require("../templates/emailTemplates");


exports.createBooking = async (req, res) => {
    try {
        const { plotId, userDetails } = req.body;
        const userId = req.user.id;

        console.log("User id ",userId);
        // Fetch the plot and owner details

        const plot = await PlotSchema.findById(plotId).populate('owner');

        console.log("Plot detail " , plot);

        if (!plot) {
            return res.status(404).json({ success: false, message: "Plot not found" });
        }
        console.log(plot.owner._id);
        console.log(plot.owner.userName);

        // Create the booking
        const newBooking = new Booking({
            plot: plot._id,
            user: userId,
            owner: plot.owner._id,
            userDetails: {
                name: userDetails.name,
                phone: userDetails.phone
            }
        });

        await newBooking.save();

        // Sending emails
        const user = await User.findById(userId);
        const owner = await User.findById(plot.owner._id);
        
        // Send email to both user and owner
        await mailSend(
            user.email,
            "🎉 Booking Confirmed for Plot",
            bookingConfirmationEmail(userDetails, plotId)
          );
      
          // Send email to the owner of the plot
          await mailSend(
            owner.email,
            "🔔 New Booking for Your Plot",
            bookingNotificationEmail(plot, userDetails, plotId)
          );

        // Respond to client
        res.status(201).json({
            success: true,
            message: "Booking created and emails sent successfully!",
            booking: newBooking
        });

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            success: false,
            message: "Error creating booking. Please try again."
        });
    }
};
