const express = require("express"),
  bodyParser = require("body-parser"),
  PORT = 8080,
  mongoose = require("mongoose"),
  validUrl = require("valid-url"),
  shortid = require("shortid"),
  cors = require('cors'),
  app = express(),
  UrlModel = require('./Models/UrlShortenModel');

mongoose.connect('mongodb://localhost/shortenUrlApp');
let db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('We are connected');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());






app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});