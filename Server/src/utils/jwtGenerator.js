const jwt = require("jsonwebtoken");
const dotenv = require("../config/dotenv.js");
function jwtGenerator(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const secretKey = dotenv.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: "5h" });
  return token;
}

module.exports = jwtGenerator;
