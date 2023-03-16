// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const db = require("../models");
const { hashPassword } = require("../utils");

// Create main model
const User = db.users;

// Create product
module.exports.createUser = async (req, res) => {
  let { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      throw new error("All fields must be filled");

    const hashedPassword = await hashPassword(password);

    // const password = passwordHashed

    const userExist = await User.findOne({
      where: {
        email: email,
       }
    });

    if (userExist)
      return res.status(400).json({
        message: "Email has already been registered",
      });

    password = hashedPassword

    const user = await User.create({
      fullName,
      email,
      password,
    });

    res.status(201).json({
      message: "User successfully created",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new error("All fields must be filled");
    const userExist = await User.findOne({
      email: email,
    });

    if (!userExist) {
      return res.status(400).json({
        message: "User does not exist",
      });
    } else {
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
