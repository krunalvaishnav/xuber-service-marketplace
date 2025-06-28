const mysql = require("mysql2");
require("dotenv").config();

const url = `mysql://root:WwvWQprHrecVkCSBbEXBBiLULkMeUayv@interchange.proxy.rlwy.net:26515/railway`
const pool = mysql.createPool(url);
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   timezone: "Z",
// });
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:",err, err.message);
  } else {
    console.log("Connected to the SQL database");
    connection.release();
  }
});

module.exports = pool.promise();
