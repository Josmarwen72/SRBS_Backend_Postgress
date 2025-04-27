const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken'); // JWT library for token verification
const router = express.Router();

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with the secret
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

// Example route to get all bookings (with authentication)
router.get('/', authenticate, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM bookings ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch bookings' });
  }
});

// Example route to create a new booking (with authentication)
router.post('/', authenticate, async (req, res) => {
  const { resource_id, user_id, booking_date } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO bookings (resource_id, user_id, booking_date) VALUES ($1, $2, $3) RETURNING *',
      [resource_id, user_id, booking_date]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create booking' });
  }
});

module.exports = router;
