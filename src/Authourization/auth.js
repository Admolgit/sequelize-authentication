const dotenv = require("dotenv");
const { verify } = require("jsonwebtoken");

dotenv.config();

const authGuard = (req, res, next) => {
  // Get bearer and token from authorization header
  let token = req.get("authorization");
  
  if (token) {
    // Getting the user token
    token = token.split(" ")[1];
    // Verifying the user token
    verify(token, process.env.JWT_SECRET, expireIn = '1h', (err, decoded) => {
      if (err) {
        res.json({
          success: 0,
          message: "Invalid token",
          error: err.message,
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "Access denied! unathorized user",
    });
  }
};

module.exports = authGuard;