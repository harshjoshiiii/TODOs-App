const mongoose = require("mongoose");

//Create Schema
const userDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
    },
  },
  //basically ise created at and update at ye particular time bhi aayega.
  { timestamps: true }
);

//Create Model
const userData = mongoose.model("UserData", userDataSchema);

module.exports = userData;