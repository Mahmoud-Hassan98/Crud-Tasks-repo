const express = require("express");
const db = require("./config/db.js");
const cors = require('cors');
const app = express();
const adminRoutes = require("./routes/admin.routes.js");
const userRoutes = require("./routes/user.routes.js");
app.use(express.json());
app.use(cors());


app.use("/admin/", adminRoutes);
app.use("/user/", userRoutes);










module.exports = app;
