const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const emailHelper = require("../utils/emailHelper");

exports.registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        message: "User already exists",
        success: false,
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.json({
      message: "User created successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    if (error._message == "User validation failed") {
      return res.status(400).json({
        message: error.errors.name.message,
        success: false,
      });
    }

    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User does not exist. Please register!",
        sussess: false,
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid credentials!",
        sussess: false,
      });
    }

    const token = jwt.sign(
      { userId: user["id"], name: user.name },
      process.env.jwt_secret,
      { expiresIn: "1d" }
    );

    res.json({
      message: "User loggged in!",
      success: true,
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const userId = req.userId;

    console.log(userId);
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: "You are authorized to go to the protected route",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const otpgenerator = function () {
  return Math.floor(Math.random() * 1000 + 90000);
};

exports.forgetPassword = async (req, res) => {
  try {
    //1.Ask email
    //2. che ck if email is present or not
    //3. if email is not present -> user not found
    //4. if email is present -> create otp send to email
    //5. also store otp in user model
    // to avoid collision
    // response -> unique url with the id of the user that will form your unique link for reset password

    if (req.body.email == undefined) {
      return res.status(401).json({
        success: false,
        message: "Please enter the email to reset password",
      });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = otpgenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 10000;

    await user.save();
    res.status(200).json({
      success: true,
      message: "otp sent to email",
    });

    await emailHelper("otp.html", user.email, { name: user.name, otp });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { otp, password } = req.body;
    if (!password || !otp) {
      return res.status(401).json({
        success: false,
        message: "invalid request",
      });
    }

    //search for user with id
    const user = await User.findOne({ otp });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    //check if otp is expired - 10min limit
    if (Date.now() > user.otpExpiry) {
      return res.status(401).json({
        success: false,
        message: "otp expired",
      });
    }

    user.password = password;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json({
      message: "password reset successfully",
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
