const { MongoClient, ServerApiVersion } = require('mongodb');



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0czr5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // await client.connect();
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  client,
  connectDB
};