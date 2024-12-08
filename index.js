const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0czr5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const moviesCollection = client.db('moviesDB').collection('movies');
    const usersCollection = client.db('moviesDB').collection('users');
    const favMoviesCollection = client.db('moviesDB').collection('favMovies');



    app.get('/movies', async (req, res) => {
      const cursor = moviesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/movies/featured', async (req, res) => {
      const { limit = 6, sort = "rating" } = req.query;
      const cursor = moviesCollection.find();
      const result = await cursor.sort({ [sort]: -1 }).limit(parseInt(limit)).toArray();
      res.send(result);
    })

    app.get('/movies/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await moviesCollection.findOne(query);
      res.send(result);
    })

    app.post('/movies', async (req, res) => {
      const newMovies = req.body;
      const result = await moviesCollection.insertOne(newMovies);
      res.send(result);
    })

    app.put('/movies/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedMovieData = req.body;
      const movie = {
        $set: {
          poster: updatedMovieData.poster,
          title: updatedMovieData.title,
          genre: updatedMovieData.genre,
          duration: updatedMovieData.duration,
          year: updatedMovieData.year,
          summary: updatedMovieData.summary
        }
      }
      const result = await moviesCollection.updateOne(filter, movie, options);
      res.send(result);
    })

    app.delete('/movies/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await moviesCollection.deleteOne(query);
      res.send(result);

    })



    //------------------API for Users--------------------//

    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    })


        //------------------API for favMovies--------------------//

        app.post('/favMovies', async (req, res) => {
          const newUser = req.body;
          const result = await favMoviesCollection.insertOne(newUser);
          res.send(result);
        })

        app.get('/favMovies', async (req, res) => {
          const email = req.query.email;
          const query = { email };
          const cursor =  favMoviesCollection.find(query);
          const result = await cursor.toArray();
          res.send(result);
        })

        app.delete('/favMovies/:id', async (req, res) => {
          // const id = req.params.id;
          // const query = { _id: new ObjectId(id) }
          // const result = await moviesCollection.deleteOne(query);
          // res.send(result);
        })





  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Movie portal server is running')
})

app.listen(port, () => {
  console.log(`Movie portal server is running on port : ${port}`)
})