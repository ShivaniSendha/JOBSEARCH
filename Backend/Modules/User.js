/* eslint-disable no-undef */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  
  },
  password: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  
  },
  gender: {
    type: String,
    required: true
  }
  ,
  language: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true,
  
  },
  facebook: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  }
  
  
});

const Signup = mongoose.model('Signupdata', userSchema); 

module.exports = Signup;
