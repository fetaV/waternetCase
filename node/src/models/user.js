const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.Promise = Promise

const UserSchema = new Schema({
  comments: String,
  category: Number,
  subCategory: Number,
  process: Number,
  date: String,
  status: Boolean,
})

const User = mongoose.model("User", UserSchema)

module.exports = User
