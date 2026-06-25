const express = require('express');
const cors = require('cors');

const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const favMovieRoutes = require('./routes/favMovieRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/favMovies', favMovieRoutes);

app.get('/', (req, res) => {
  res.send('Movie portal server is running');
});

module.exports = app;