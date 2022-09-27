const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
});

//create model
const User = mongoose.model("user", userSchema);

//export model
module.exports = User;
