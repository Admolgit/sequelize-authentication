const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const db = require("../models");
const validatePassword = require("../middlewares/validatePassword")
const { hashPassword } = require("../utils");

dotenv.config();

// Create main model
const User = db.users;
const Product = db.products;

// Create product
module.exports.createUser = async (req, res) => {
  const { fullName, email } = req.body;
  let { password } = req.body;
  try {

    const valid = validatePassword(password);

    if(!valid) throw new Error(`Invalid password, password must not be contain special character`)

    if (!fullName || !email || !password)
      throw new error("All fields must be filled");

    const hashedPassword = await hashPassword(password);

    const userExist = await User.findOne({
      where: {
        email: email,
      },
    });

    if (userExist)
      return res.status(400).json({
        message: "Email has already been registered",
      });

    password = hashedPassword;

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
      where: {
        email: email,
      },
    });

    if (!userExist) {
      return res.status(400).json({
        message: "User does not exist",
      });
    } else {
      const hashedPasword = userExist.dataValues.password;
      if (bcrypt.compareSync(password, hashedPasword)) {
        const token = jwt.sign({ data: userExist }, process.env.JWT_SECRET);
        return res.status(200).json({
          success: 1,
          message: "User logged in successfully",
          token: token,
          data: userExist,
        });
      } else {
        return res.status(403).json({
          success: 0,
          message: "Invalid email and password",
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      return res.status(404).json({
        message: "No users found in the database",
      });
    } else {
      res.status(200).json({
        message: "Users fetched successfully",
        data: users,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found in the database",
      });
    } else {
      res.status(200).json({
        message: "User fetched successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password } = req.body;

  try {
    const user = await User.update(
      {
        fullName: fullName,
        email: email,
        password: password
      },
      {
      where: {
        id: id,
      },
    }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found in the database",
      });
    } else {
      res.status(200).json({
        message: `User with id ${id} successfully updated`
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.destroy({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found in the database",
      });
    } else {
      res.status(200).json({
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.getUserReviews = async (req, res) => {
  try {
    const user = await User.findAll({
      include: [{
        model: Product,
        as: 'product'
      }],
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      message: "product review fetched successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}