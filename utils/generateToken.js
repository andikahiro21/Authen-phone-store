var jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: data,
    },
    process.env.JWT_SECRET
  );
};

const generateTokenReset = (data) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 5 * 60,
      data: data,
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  generateToken,
  generateTokenReset,
};
