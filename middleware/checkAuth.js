const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Breaer" "token
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.userData = decoded;
    console.log(req.userData);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
