const jwt = require("jsonwebtoken");
const { handleServerError } = require("./handleError");
// ... other imports ...

exports.tokenData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {}
};
