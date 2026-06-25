const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const moviesCollection = client.db("moviesDB").collection("movies");

//select * from moviesCollection
const getMovies =  async (req, res) => {
  const { sort = "rating" } = req.query;
  const cursor = moviesCollection.find();
  const result = await cursor.sort({ [sort]: -1 }).toArray();
  res.send(result);
};

const getFeaturedMovies = async (req, res) => {
  const { limit = 8 } = req.query;
  const cursor = moviesCollection.find();
  const result = await cursor.limit(parseInt(limit)).toArray();
  res.send(result);
};

//select * from moviesCollection where id = _id;
const getMovieById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await moviesCollection.findOne(query);
  res.send(result);
};

const createMovie = async (req, res) => {
  const newMovies = req.body;
  const result = await moviesCollection.insertOne(newMovies);
  res.send(result);
};

const updateMovie = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedMovieData = req.body;
  const movie = {
    $set: {
      poster: updatedMovieData.poster,
      title: updatedMovieData.title,
      genre: updatedMovieData.genre,
      duration: updatedMovieData.duration,
      year: updatedMovieData.year,
      rating: updatedMovieData.rating,
      summary: updatedMovieData.summary,
    },
  };
  const result = await moviesCollection.updateOne(filter, movie, options);
  res.send(result);
};

const deleteMovie = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await moviesCollection.deleteOne(query);
  res.send(result);
};

module.exports = {
  getMovies,
  getFeaturedMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
