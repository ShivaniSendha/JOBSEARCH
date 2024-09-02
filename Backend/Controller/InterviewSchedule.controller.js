const express = require('express');
const nodemailer = require('nodemailer');
const AddJob = require('../Modules/AddJob'); // Assuming AddJob is your Mongoose model

const InterviewSchedule = async (req, res) => {
  console.log('====================================');
  console.log('Request Body:', req.body);
  console.log('====================================');

  const { userId, jobId, date, time } = req.body;

  try {
    // Find the job by jobId and update the user’s application with the interview details
    const job = await AddJob.findById(jobId);
    
    console.log('====================================');
    console.log('Found Job:', job);
    console.log('====================================');

    if (!job) {
      return res.status(404).send('Job not found');
    }

    const userApplication = job.users.find(user => user.userId?.toString() === userId);

    if (!userApplication) {
      return res.status(404).send('User application not found');
    }

    // Log userApplication to check its structure
    console.log('====================================');
    console.log('User Application:', userApplication);
    console.log('====================================');

    // Update the user’s application with interview details
    userApplication.interview = { date, time };

    await job.save();

    

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || 'stefan.weber@ethereal.email',
        pass: process.env.SMTP_PASS || 'FCMVbmY3TzSD9hxetP'
      }
    });

    // Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Ensure this is correctly set
      to: 'admin@gmail.com', // Recipient email
      subject: 'Interview Scheduled',
      text: `Your interview has been scheduled for ${date} at ${time}.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).send('Interview scheduled and email sent.');
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).send('Failed to schedule interview.');
  }
};

module.exports = InterviewSchedule;
