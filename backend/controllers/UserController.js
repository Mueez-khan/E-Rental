const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");

const User = require("../models/userSchema");
const Otp = require("../models/OtpSchema");

require("dotenv").config();

// Send OTP function
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const ExistingUser = await User.findOne({ email });
    if (ExistingUser) {
      return res.status(401).json({
        success: false,
        message: "This email already exists. Try registering with a different email."
      });
    }

    // Generate OTP
    var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    console.log("OTP is generated:", otp);

    // Create an entry in the database for OTP
    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload); // Await OTP creation
    console.log("otp body ",otpBody);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Failed to generate or send OTP"
    });
  }
};



// User registration controller
// User registration controller
exports.register = async (req, res) => {
  try {
    const { userName, email, phoneNumber, accountType, otp, password, confirmPassword } = req.body;

    // Check if all fields are filled
    if (!userName || !email || !phoneNumber || !accountType || !otp || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Please fill all fields"
      });
    }

    // Find the most recent OTP
    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    console.log("Recent otp", recentOtp);

    // Validate the OTP
    if (!recentOtp || otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP"
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      userName,
      email,
      phoneNumber,
      accountType,
      password: hashedPassword
    });

    await newUser.save();
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err); // Detailed error logging
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};







// User login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "The User does not exist with this email",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d' ,
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS in production
        sameSite: 'Lax', // Change this based on your use case
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password does not match. Try again.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error while logging in",
    });
  }
};
