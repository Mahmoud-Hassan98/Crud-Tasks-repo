const jwt = require("jsonwebtoken");
const dotenv =  require('../config/dotenv.js');
module.exports = function (req, res, next) {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decodedToken = jwt.verify(token, dotenv.JWT_SECRET); 
    const user = decodedToken
    req.userId = user.id;
    req.userRole = user.role 

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};