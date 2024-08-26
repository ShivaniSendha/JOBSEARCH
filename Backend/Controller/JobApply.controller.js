/* eslint-disable no-undef */



const AddJob = require('../Modules/AddJob');


  
  const ApplyJOb=async (req, res) => {
  const { jobId, status } = req.body;

  try {
    
    const job = await AddJob.findById(jobId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = status;
    await job.save();

    res.status(200).json({ message: 'Job application status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
}
module.exports = ApplyJOb;
