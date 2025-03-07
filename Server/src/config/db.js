dotenv = require('./dotenv.js')
const { Pool } = require("pg");

pool  = new Pool ({
    user: dotenv.DB_USER,
    host: dotenv.DB_HOST,
    database: dotenv.DB_NAME,
    password: dotenv.DB_PASSWORD,
    port: dotenv.DB_PORT,

})
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Connection error', err.stack));
  module.exports = pool;
