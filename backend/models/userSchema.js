const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    userName : {
        type : String ,
        required : true,

    },
    email : {
        type : String ,
        required : true,

    },
    phoneNumber : {
        type: String,
    required: true,
    // You can add a regex pattern to validate phone numbers if needed
    match: [/^\+?\d{7,15}$/, 'Please provide a valid phone number'] 
    },
    accountType : {
        type : String,
        enum : ["Owner" , "Renter"],
        required : true
    },
    favoritePlots : [{

        type : mongoose.Schema.Types.ObjectId,
        ref : "PlotSchema",

    }],

    password : {
        type : String ,
        required : true,
    }
    

});


const User = mongoose.model("User" , UserSchema);
module.exports = User;