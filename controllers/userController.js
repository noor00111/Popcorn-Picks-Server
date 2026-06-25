const { client } = require("../config/db");

const usersCollection = client.db("moviesDB").collection("users");

const createUser =  async (req, res) => {
const newUser = req.body;
const result = await usersCollection.insertOne(newUser);
  res.send(result);
};

module.exports = {
  createUser,
};
