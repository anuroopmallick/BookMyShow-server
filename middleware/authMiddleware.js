const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.jwt_secret);
    req.userId = verifiedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
