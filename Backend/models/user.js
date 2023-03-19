const validator = require("validator");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "This username is not available! Try other one"],
      minlength: [4, "Your name must contain atleast 4 character"],
      validate: [validator.isAlpha, "Your name must contain only characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter your email"],
      unique: [true, "This Email already exist, try other one"],
      lowercase: true,
      validate: [
        validator.isEmail,
        "Please enter a valid email e.g: abc@xyz.com ",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "A password must be 8 character long"],
    },
    photo: {
      type: String,
      required: true,
    },
    resetLink: {
      data: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);