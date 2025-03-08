const userService = require("../services/user.service.js");

const getAllUsersController = async (req, res) => {
  if (req.userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Access forbidden: You are not an admin." });
  }
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsersController };
