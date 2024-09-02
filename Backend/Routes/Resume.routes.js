const express = require('express');
const { Resumedownload } = require('../Controller/resume.controller');
const router = express.Router();


// Define the route for downloading resumes
router.get('/download/:resume', Resumedownload);

module.exports = router;
