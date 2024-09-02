const path = require('path');

// Controller function to handle resume download
const Resumedownload = (req, res) => {
  // Extract resume filename from request parameters
  const resumeFileName = req.params.resume;
  
  // Build the full path to the resume file
  const resumePath = path.resolve(__dirname, '..', 'uploads', 'resumes', resumeFileName);
  
  // Send the file for download
  res.download(resumePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
};

module.exports = { Resumedownload };
