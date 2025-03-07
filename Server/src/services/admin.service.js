const db = require('../config/db.js');

const getAdminToken = async (email, password) => {
  console.log(email);
  console.log(password);

  try {
    const result = await db.query("SELECT * FROM admins WHERE email = $1 AND password = $2", [email, password]);
    console.log(result.rows); // This will give you the actual rows
    return result.rows;
  } catch (error) {
    console.error('Error during database query:', error);
    throw error;
  }
};

module.exports = { getAdminToken };
