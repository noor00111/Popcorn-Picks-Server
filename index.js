require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db");

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Movie portal server is running on port : ${port}`);
    });
  } catch (err) {
    console.log("Failed to start to server:", err);
  }
}
startServer();