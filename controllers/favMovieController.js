const { client } = require("../config/db");

const favMoviesCollection = client.db("moviesDB").collection("favMovies");

const createFavMovie = async (req, res) => {
  const newUser = req.body;
  const result = await favMoviesCollection.insertOne(newUser);
  res.send(result);
};

const getFavMovies = async (req, res) => {
  const email = req.query.email;
  const query = { email };
  const cursor = favMoviesCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
};

const deleteFavMovie =  async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await favMoviesCollection.deleteOne(query);
  res.send(result);
};

module.exports = {
  createFavMovie,
  getFavMovies,
  deleteFavMovie,
};
