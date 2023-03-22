const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');

dotenv.config();

module.exports.hashPassword = async (password) => {
  const salt = process.env.SALT;
  return bcrypt.hashSync(password, +salt);
};