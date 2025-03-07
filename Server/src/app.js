const express = require('express');
const db = require('./config/db.js');
const app = express(); 
app.use(express.json());
const adminRoutes = require('./routes/admin.routes.js');



app.use('/admin/', adminRoutes)










module.exports = app;