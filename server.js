const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/NoteRoutes.js");

const DB_URL =
  "mongodb+srv://benngraham:DatrZAVoFibbx0MX@cluster0.zfxs9.mongodb.net/comp3123?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise = global.Promise;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", noteRoutes);

app.route("/").get((req, res) => {
  res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
