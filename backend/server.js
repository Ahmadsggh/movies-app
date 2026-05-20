const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Fix for Node.js v24 DNS issue with MongoDB SRV
dns.setDefaultResultOrder('ipv4first');

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const postLogger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - allow frontend to communicate with backend
app.use(cors({
  origin: ['http://localhost:5173', 'https://movies-app-2mb7.onrender.com'],
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

// Custom POST logger middleware
app.use(postLogger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Movies API is running!' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  family: 4,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
