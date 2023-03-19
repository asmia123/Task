const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema(
  {
    libraryId: [{
        type: Schema.Types.ObjectId,
        ref: "library"
    }],
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "author",
        required: true
    },
    bookname: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "This bookname already exist! Try other one"],
      minlength: [3, "Bookname must contain atleast 3 characters"],
    },
    year: {
      type: String,
      required: true,
      minlength: [4, "A year must be 4 characters long"],
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);