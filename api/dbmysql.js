const mysql = require('mysql2')
const { HOST, USER, PASSWORD, DATABASE } = require('./utils/config.js')

const connections = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = connections
