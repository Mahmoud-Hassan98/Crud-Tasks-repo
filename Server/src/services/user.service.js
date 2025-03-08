const db = require("../config/db.js");


const getAllUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM users ");
    return result.rows;
  } catch (error) {
    throw new Error("Error fetching users from the database: " + error.message);
  }
};

module.exports = { getAllUsers };
