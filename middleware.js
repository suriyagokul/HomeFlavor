const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(400).send("Token not found");
    }
    let decoded = jwt.verify(token, "jwtPassword");
    req.user = decoded.user;
    next();
  } catch (e) {
    return res.status(403).send(e);
  }
};
