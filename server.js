// Express server setup for SRBS backend
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db');

const app = express(); // ✅ move this up before using app!

// CORS setup - allowing specific origins
const allowedOrigins = ['http://localhost:5500', // for local testing
                       'http://192.168.100.7:5500', // for local network
    'https://josmarwen72.github.io/Student-Resource-Booking-System_Frontend/'              
  ];

// CORS middleware
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return cb(null, true); // Allow the request
    }
    cb(new Error(`CORS denied for ${origin}`)); // Reject the request
  },
  credentials: true, // Allow credentials (cookies, auth headers)
}));

// Middleware for parsing JSON requests
app.use(express.json());

// Routes for API endpoints
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint to check server status
app.get('/', (req, res) => {
  res.send('Student Resource Booking System API is running');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
