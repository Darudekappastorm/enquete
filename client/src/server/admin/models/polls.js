const mongoose = require("mongoose");

module.exports = mongoose.model(
  "poll",
  new mongoose.Schema({
    name: String,
    questions: Array,
    status: String,
    completed: Number,
    date: {
      type: Date,
      default: Date.now
    }
  })
);
