const adminService = require("../services/admin.service");
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminToken = await adminService.getAdminToken(email, password);
    res.json({ adminToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginAdmin };
