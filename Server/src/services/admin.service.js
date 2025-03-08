const db = require("../config/db.js");
const jwtGenerator = require("../utils/jwtGenerator.js");

const getAdminToken = async (email, password) => {
  try {
    const result = await db.query(
      "SELECT * FROM admins WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      throw new Error("Email or password is incorrect");
    }
    const adminToken = jwtGenerator(result.rows[0]);

    return adminToken;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
};

module.exports = { getAdminToken };
