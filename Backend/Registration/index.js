

// const updateProfileRoute = require('../Routes/user.routes.js');
// const ApplyJOb = require('../Routes/ApplyJob.route.js');
// const express = require('express');
// const cors = require('cors');
// require('../db/connection'); 
// const UserRouter = require('../Routes/user.routes.js');
// const AddJobRouter = require('../Routes/AddJob.routes.js');
// const app = express();
// const port = 8000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.send("Hi, server is running!");
// });

// // User-related routes
// app.use('/UserLogin', UserRouter);


// // Job-related routes
// app.use('/Addnewjob', AddJobRouter);
// app.use('/ApplyJob', ApplyJOb);

// app.use('/api', updateProfileRoute); 

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('../db/connection'); 

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads'

// Routes
app.get('/', (req, res) => {
  res.send("Hi, server is running!");
});

// Import routes
const updateProfileRoute = require('../Routes/user.routes.js');
const ApplyJOb = require('../Routes/ApplyJob.route.js');
const UserRouter = require('../Routes/user.routes.js');
const AddJobRouter = require('../Routes/AddJob.routes.js');
const Resume = require('../Routes/Resume.routes.js')
const scheduleInterview =require('../Routes/InterviewSchedule.routes.js')
// User-related routes
app.use('/UserLogin', UserRouter);

// Job-related routes
app.use('/Addnewjob', AddJobRouter);
app.use('/api', updateProfileRoute);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
app.use('/resume', Resume);
app.use('/interview', scheduleInterview);

const upload = multer({ storage: storage });

// ApplyJob route
app.use('/ApplyJob', upload.single('resume'), ApplyJOb);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




