
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const AddJob = require('../Modules/AddJob')
const Signup = require('../Modules/User')
const InterviewSchedule = async (req, res) => {
  const { userId, jobId, date, time } = req.body;
  const user = await Signup.findById(userId);
  const job = await AddJob.findById(jobId);
  require('dotenv').config();
  if (!user || !job) {
    return res.status(400).json({ message: 'Invalid user or job information' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    logger: true,
    debug: true
  });

  console.log('Email:', process.env.EMAIL_USER);
  console.log('Password:', process.env.EMAIL_PASS);


  const mailOptions = {
    from: 'shivani.sendhav@softude.com',
    to: user.email,
    subject: 'Interview Scheduled',
    html: `
    <p>Dear <strong>${user.name}</strong>,</p>
    <p>We hope this email finds you well. On behalf of <strong>${job.companyName}</strong>, I am pleased to invite you for an interview for the position of <strong>${job.skills}</strong> at our organization.</p>
    <p><strong>Interview details:</strong></p>
    <p><strong>Date:</strong> ${date}<br>
       <strong>Time:</strong> ${time}<br>
       <strong>Location:</strong> ${job.address}, ${job.city}</p>
    <p>Best regards,<br>
    <strong>${job.companyName}</strong><br>
    +91 ${job.phoneNo}</p>
  `,
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

