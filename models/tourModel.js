const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is string and required Field"],
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    default: 2000,
  },
  email: {
    type: String,
    required: [true, "Must be valid email and non empty"],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    unique: true,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
