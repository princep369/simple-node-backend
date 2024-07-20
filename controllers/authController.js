const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(firstName, lastName, email, hashedPassword);

    res.status(201).json({
      success: true,
      message: "User registered",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      message: "User logged in",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkLoginStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is logged in",
    data: req.user,
  });
};

module.exports = {
  register,
  login,
  checkLoginStatus
};
