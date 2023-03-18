const dotenv = require("dotenv");
const { verify } = require("jsonwebtoken");

dotenv.config();

async function validateToken(token) {
  return new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET, (error, decoded) => {
      console.log(decoded)
      if (error) return reject(error);
      resolve(decoded);
    });
  });
}

function getTokenFromHeader(req) {
  if (
    req.headers.authorization ||
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const authGuard = () => {
  return async function attachUserData(req, res, next) {
    const token = getTokenFromHeader(req);
    if (token) {
      try {
        const data = await validateToken(token);
        console.info(JSON.stringify(data));
        req.body.userId = Number(data.id);
        if (data) {
          return next();
        }
      } catch (error) {
        return res.status(401).json({
          message: "Invalid permissions",
          error: error.message,
        });
      }
    } else {
      return res.status(403).json({
        message: "Access denied",
      });
    }
  };
};

module.exports = authGuard;
