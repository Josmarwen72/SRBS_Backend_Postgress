const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken'); // Add this for JWT token verification
const router = express.Router();

// Helper function to authenticate the user
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with your JWT secret
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

// GET /api/resources — list all resources
router.get('/', authenticate, async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT id, name, category, description FROM resources ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch resources' });
  }
});

// GET /api/resources/:id — get single resource
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      'SELECT id, name, category, description FROM resources WHERE id = $1',
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Resource not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch resource' });
  }
});

// POST /api/resources — create resource (admin only)
router.post('/', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403); // Check if user is an admin
  const { name, category, description } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO resources(name, category, description) VALUES($1, $2, $3) RETURNING *',
      [name, category, description]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create resource' });
  }
});

// PUT /api/resources/:id — update resource (admin only)
router.put('/:id', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403); // Check if user is an admin
  const { id } = req.params;
  const { name, category, description } = req.body;
  try {
    const { rowCount } = await db.query(
      'UPDATE resources SET name = $1, category = $2, description = $3 WHERE id = $4',
      [name, category, description, id]
    );
    if (!rowCount) return res.status(404).json({ error: 'Resource not found' });
    res.json({ message: 'Resource updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update resource' });
  }
});

// DELETE /api/resources/:id — delete resource (admin only)
router.delete('/:id', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403); // Check if user is an admin
  const { id } = req.params;
  try {
    const { rowCount } = await db.query(
      'DELETE FROM resources WHERE id = $1', [id]
    );
    if (!rowCount) return res.status(404).json({ error: 'Resource not found' });
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete resource' });
  }
});

module.exports = router;
