/* eslint-disable no-undef */
const updateProfileRoute=require('../Routes/user.routes.js')
const express = require('express');
const cors = require('cors');
require('../db/connection'); // Ensure this path is correct
const UserRouter = require('../Routes/user.routes.js');
const AddJobRouter = require('../Routes/AddJob.routes.js');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send("Hi, server is running!");
});

// User-related routes
app.use('/UserLogin', UserRouter);
app.use('/UserRegistration', UserRouter);

// Job-related routes
app.use('/Addnewjob', AddJobRouter);
// ====================================
// ====================================
// ====================================



// Adjust the path as necessary

app.use('/api', updateProfileRoute); // Use the correct base path

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
