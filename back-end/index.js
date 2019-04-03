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


//Post Request (adding URL to DB)
app.post("/url", async (req, res) => {

  const { originalUrl, shortBaseUrl } = req.body;
  if (validUrl.isUri(shortBaseUrl)) {
  } else {
    return res
      .status(401)
      .json(
        "Invalid Base Url"
      );
  }

  const urlCode = shortid.generate();
  const updatedAt = new Date();
  if (validUrl.isUri(originalUrl)) {

    shortUrl = shortBaseUrl + "/" + urlCode;
    const item = new UrlModel({
      originalUrl,
      shortUrl,
      urlCode,
      updatedAt
    });
    await item.save();
    res.status(200).json(item);

  } else {
    return res
      .status(401)
      .json(
        "Invalid Original Url"
      );
  }
});

//Get Request Fetches URLS from DB
app.get('/url', (req, res) => {
  UrlModel.aggregate([
    { $match: {} },
    { $group: { _id: "$originalUrl", count: { $sum: 1 } } }
  ]).limit(5).sort({ count: -1 })
    .then(data => {
      res.json(data)
    })
})



app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});