/* eslint-disable no-undef */

const mongoose = require('mongoose');


const AddJobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  salaryRange: {
    type: String,
    required: true
  },
  vacancies: {
    type: Number,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  skills: {
    type: [String], // Array of strings for multiple skills
    required: true
  },
  email: {
    type: String,
    required: true,
   
  },
  phoneNo: {
    type: String,
    required: true,
    
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  }
  ,
  
  status: {
    type: String,

  }
});


const AddJob = mongoose.model('AddJob', AddJobSchema);


module.exports = AddJob;
