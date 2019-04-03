const mongoose = require("mongoose");
Schema = mongoose.Schema;

const UrlShortenSchema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const urlModel = mongoose.model("UrlShorten", UrlShortenSchema);
module.exports = urlModel;