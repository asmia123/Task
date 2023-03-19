const validator = require("validator");
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  authorname: {
    type: String,
    required: true
  },
  dateofBirth: {
    type: Date,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
},
{ timestamps: true });

const Author = mongoose.model('author', authorSchema);

module.exports = Author;
