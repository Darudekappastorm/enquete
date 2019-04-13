const mongoose = require("mongoose");

module.exports = mongoose.model(
  "account",
  new mongoose.Schema({
    username: String,
    username_lower: String,
    password: String
  })
);
