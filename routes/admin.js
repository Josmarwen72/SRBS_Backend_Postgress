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

// Example route for admin to manage resources (admin only)
router.get('/resources', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const { rows } = await db.query('SELECT * FROM resources');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch resources' });
  }
});

// Example route for admin to delete a booking (admin only)
router.delete('/bookings/:id', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { id } = req.params;
  try {
    const { rowCount } = await db.query('DELETE FROM bookings WHERE id = $1', [id]);
    if (!rowCount) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete booking' });
  }
});

module.exports = router;
