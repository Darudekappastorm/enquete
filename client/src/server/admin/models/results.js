const mongoose = require("mongoose");

module.exports = mongoose.model(
  "result",
  new mongoose.Schema({
    username: String,
    name: String,
    questions: Array,
    target: String
  })
);
