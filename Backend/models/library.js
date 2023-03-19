const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema(
  {
    libraryname: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("library", librarySchema);