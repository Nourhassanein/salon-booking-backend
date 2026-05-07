const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
<<<<<<< HEAD
  port: process.env.DB_PORT
=======
  port: process.env.DB_PORT 
>>>>>>> 6be6e255001a7c18db8e819a3678121f333c26b4
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
