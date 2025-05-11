const mongoose = require("mongoose");
const mailSend = require("../utils/mailSender");


const OtpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600 // 10 minutes in seconds
    }
  });
  

async function sendVerificationMail(email , otp)
{

    try{

        const mailResponse = await mailSend(email , "OTP verification" , otp)
        console.log("Email send successFully :", mailResponse)
    }
    catch(err)
    {
        console.log("Error occur while sending email",err);
    }

}

OtpSchema.pre("save" , async function(next){

    await sendVerificationMail(this.email , this.otp);

    next();


})

module.exports = mongoose.model("Otp" , OtpSchema);