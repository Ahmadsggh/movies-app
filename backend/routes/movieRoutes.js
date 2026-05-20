const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const requireAuth = require('../middleware/auth');

// GET /api/movies - Get all movies (public)
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().populate('createdBy', 'username');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// POST /api/movies - Create a movie (auth required)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, director, genre, year, rating } = req.body;

    if (!title || !director || !genre || !year || !rating) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const movie = new Movie({
      title,
      director,
      genre,
      year,
      rating,
      createdBy: req.session.userId,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// PUT /api/movies/:id - Update a movie (auth + ownership required)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, director, genre, year, rating } = req.body;

    // Check ownership: only the creator can update
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.session.userId },
      { title, director, genre, year, rating },
      { new: true }
    );

    if (!movie) {
      return res.status(403).json({ message: 'Not authorized or movie not found.' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// DELETE /api/movies/:id - Delete a movie (auth + ownership required)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    // Check ownership: only the creator can delete
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.session.userId,
    });

    if (!movie) {
      return res.status(403).json({ message: 'Not authorized or movie not found.' });
    }

    res.json({ message: 'Movie deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
