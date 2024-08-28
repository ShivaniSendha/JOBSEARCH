/* eslint-disable no-undef */
const mongoose = require('mongoose');
const bcrypt =require('bcryptjs')
const userSchema = new mongoose.Schema({

  name: {
    type: String,
   
  },
  email: {
    type: String,
    required: true,
  
  },
  password: {
    type: String,
    

  },
  phoneNo: {
    type: String,

  },
  address: {
    type: String,
    
  
  },
  gender: {
    type: String,
   
  }
  ,
  language: {
    type: String,
  },
  dob: {
    type: String,
   
  },
  facebook: {
    type: String,
   
  },
  twitter: {
    type: String,
  
  }
  
  
});

const Signup = mongoose.model('Users', userSchema); 

module.exports = Signup;
