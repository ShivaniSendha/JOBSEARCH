

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
    type: [String],
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

 
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      },
      status: {
        type: String,
      },
      date: {
        type: String,
        default: Date.now
      },
      time: {
        type: String
      },
      resume:{
        type:String
      },
      interviewDate:{
        date: Date,
        time: String,
        interviewDate: Date
      },
      
      
      
    }
  ]
 
});


const AddJob = mongoose.model('AddJob', AddJobSchema);


module.exports = AddJob;
