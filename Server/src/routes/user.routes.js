const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/user.controller");

router.get("/get-all-users", authMiddleware ,  userController.getAllUsersController);


module.exports = router;


