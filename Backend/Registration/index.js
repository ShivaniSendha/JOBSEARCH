/* eslint-disable no-undef */
const updateProfileRoute = require('../Routes/user.routes.js');
const ApplyJOb = require('../Routes/ApplyJob.route.js');
const express = require('express');
const cors = require('cors');
require('../db/connection'); // Ensure this path is correct
const UserRouter = require('../Routes/user.routes.js');
const AddJobRouter = require('../Routes/AddJob.routes.js');
const ProfileCRUD =require('../Routes/user.routes.js')
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


// Job-related routes
app.use('/Addnewjob', AddJobRouter);
app.use('/ApplyJob', ApplyJOb);
// ====================================
// ====================================
// ====================================

// app.use('/profileCRUD', ProfileCRUD);



app.use('/api', updateProfileRoute); // Use the correct base path

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
