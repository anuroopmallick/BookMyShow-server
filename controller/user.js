const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
