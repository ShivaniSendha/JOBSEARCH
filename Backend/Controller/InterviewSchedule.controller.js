// const express = require('express');
// const nodemailer = require('nodemailer');
// const AddJob = require('../Modules/AddJob'); // Assuming AddJob is your Mongoose model

// const InterviewSchedule = async (req, res) => {
//   const { userId, jobId, date, time } = req.body;

//   try {

//     const job = await AddJob.findById(jobId);
//     if (!job) {
//       return res.status(404).send('Job not found');
//     }

//     const userApplication = job.users.find(user => user.userId?.toString() === userId);

//     if (!userApplication) {
//       return res.status(404).send('User application not found');
//     }

//     userApplication.interview = { date, time };

//     await job.save();


//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || 'smtp.ethereal.email',
//       port: process.env.SMTP_PORT || 587,
//       auth: {
//         user: process.env.SMTP_USER || 'stefan.weber@ethereal.email',
//         pass: process.env.SMTP_PASS || 'FCMVbmY3TzSD9hxetP'
//       }
//     });

//     // Prepare mail options
//     const mailOptions = {
//       from: process.env.EMAIL_USER, 
//       to: 'admin@gmail.com', 
//       subject: 'Interview Scheduled',
//       text: `Your interview has been scheduled for ${date} at ${time}.`,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     res.status(200).send('Interview scheduled and email sent.');
//   } catch (error) {
//     console.error('Error scheduling interview:', error);
//     res.status(500).send('Failed to schedule interview.');
//   }
// };

// module.exports = InterviewSchedule;

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const AddJob =require('../Modules/AddJob')
const Signup =require('../Modules/User')
const InterviewSchedule= async (req, res) => {
  const { userId, jobId, date, time } = req.body;
  const user = await Signup.findById(userId);
  const job = await AddJob.findById(jobId);

  if (!user || !job) {
    return res.status(400).json({ message: 'Invalid user or job information' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL_USER , 
      pass: process.env.EMAIL_PASS
    },
  });

  
  const mailOptions = {
    from: 'shivani.sendhav@softude.com',
    to: user.email, 
    subject: 'Interview Scheduled',
    text: `Dear ${user.name},\n\nYour interview for the job position ${job.skills} has been scheduled on ${date} at ${time}.\n\nBest regards,\n${job.companyName} +91 \n${job.phoneNo}`,
  };

  try {
   
    await transporter.sendMail(mailOptions);
    const jobId = user; 
    const userId = job 
    
    const interviewDetails = {
      userId: userId,
      date: date, 
      time: time, 
    
    };
    
    await AddJob.findByIdAndUpdate(
      jobId,
      { $push: { users: interviewDetails } },
      { new: true, runValidators: true }
    );
    

    res.status(200).json({ message: 'Interview scheduled and email sent' });
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).json({ message: 'Failed to schedule interview' });
  }
}

module.exports = InterviewSchedule;

