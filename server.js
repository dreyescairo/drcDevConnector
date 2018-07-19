//require the express module
const express = require("express");
const mongoose = require("mongoose");
//init our express app
const app = express();

//dbconfig
const db = require("./config/keys").mongoURI;

//connect to mongodb

mongoose
  .connect(db)
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World (How Cliche')"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
