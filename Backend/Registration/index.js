const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('../db/connection');

const updateProfileRoute = require('../Routes/user.routes.js');
const ApplyJob = require('../Routes/ApplyJob.route.js');
const UserRouter = require('../Routes/user.routes.js');
const AddJobRouter = require('../Routes/AddJob.routes.js');
const Signup = require('../Modules/User.js'); // Assuming this is your User model
const upload = require('../Controller/upload.js');

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
app.use('/ApplyJob', ApplyJob);

// ====================================
// ====================================
// ====================================

// app.use('/profileCRUD', ProfileCRUD);

app.use('/api', updateProfileRoute); // Use the correct base path

// Configure multer
const fs = require('fs');



const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

app.patch('/api/updateProfile/:id', upload.single('profilePic'), async (req, res) => {
  const userId = req.params.id;
  try {
    const { name, email, password, phoneNo, address, gender, language, dob, facebook, twitter } = req.body;
    const profilePic = req.file ? req.file.path : null;

    const updatedUser = await Signup.findByIdAndUpdate(userId, {
      name,
      email,
      password,
      phoneNo,
      address,
      gender,
      language,
      dob,
      facebook,
      twitter,
      profilePic
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

app.use('/uploads', express.static(path.join(__dirname ,'uploads')));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});