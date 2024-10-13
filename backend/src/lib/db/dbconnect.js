const mysql = require("mysql2");
/**
 * @description creates a connection to the database
 * @returns a connection object
 */
const client = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DB_NAME,
});
module.exports = client;
