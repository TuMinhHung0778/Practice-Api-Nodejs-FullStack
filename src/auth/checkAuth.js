const jwt = require("jsonwebtoken");

// middleware
const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const createAccesToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    // tìm hiểu về jwt bất đối xứng
    expiresIn: "1d",
    algorithm: "HS256",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
    algorithm: "HS256",
  });
};

module.exports = { asyncHandler, createAccesToken, createRefreshToken };
