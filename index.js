const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userInteractionRoutes = require("./routes/user-interaction");
const postRoutes = require("./routes/post");
const postInterationRoutes = require("./routes/postInteraction");
const validateUser = require("./middleware/validateUser");
const getAllPosts = require("./middleware/getAllPosts");

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(express.json());
app.use(allowCrossDomain);
app.use('/api/authenticate', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/all_posts', validateUser, getAllPosts);
app.use('/api', userInteractionRoutes);
app.use('/api', postInterationRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}.`));
  })
  .catch((err) => console.error("could not connect to MongoDB", err));