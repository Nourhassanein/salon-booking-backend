const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Glow Salon API is running...");
});

// GET ALL SERVICES
app.get("/api/services", (req, res) => {

  const sql = "SELECT * FROM services";

  db.query(sql, (err, results) => {

    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.status(200).json(results);

  });
});

// INSERT NEW BOOKING
app.post("/api/bookings", (req, res) => {

  const {
    user_id,
    service_id,
    booking_date,
    booking_time
  } = req.body;

  const sql = `
    INSERT INTO bookings
    (user_id, service_id, booking_date, booking_time)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, service_id, booking_date, booking_time],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Booking failed"
        });
      }

      res.status(201).json({
        message: "Booking created successfully",
        bookingId: result.insertId
      });

    }
  );
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});