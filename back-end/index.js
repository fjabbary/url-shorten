const epxress = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  PORT = 8080,
  validUrl = require("valid-url"),
  shortid = require("shortid"),
  cors = require('cors');