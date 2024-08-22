/* eslint-disable no-undef */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true
  },
  email:
  {
    type: String,
    required: true, unique: true
  },
  password:
  {
    type: String,
    required: true
  }
});

const Signup = mongoose.model('details', userSchema); 

module.exports = Signup;
