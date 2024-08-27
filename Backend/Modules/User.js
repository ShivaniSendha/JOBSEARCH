/* eslint-disable no-undef */
const mongoose = require('mongoose');
const bcryptjs =require('bcryptjs')
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
// userSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password=await bcryptjs.hash(this.password,salt)
// })
const Signup = mongoose.model('Signupdata', userSchema); 

module.exports = Signup;
