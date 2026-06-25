const express = require('express');
const router = express.Router();

const {createFavMovie, getFavMovies, deleteFavMovie} = require('../controllers/favMovieController');

router.post('/', createFavMovie);
router.get('/', getFavMovies);
router.delete('/:id', deleteFavMovie);

module.exports = router;