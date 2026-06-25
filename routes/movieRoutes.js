const express = require('express');
const router = express.Router();

const {getMovies,
  getFeaturedMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,} = require('../controllers/movieController');

router.get('/movies', getMovies);
router.get('/movies/featured', getFeaturedMovies);
router.get('/movies/:id', getMovieById);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

module.exports = router;