const {createPool} = require('mysql2/promise')
require('dotenv').config()

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
//const pool= require('../config/dbConection.js')

/* const [result] = await pool.query('SELECT * from test')
  console.log(result[0]) */
  
module.exports = pool