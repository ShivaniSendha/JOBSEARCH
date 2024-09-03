
const AddJob = require('../Modules/AddJob.js');

const AddNewJob = async (req, res) => {
  try {

    const CompanyLogo = req.file ? req.file.path : null;


    const jobData = {
      ...req.body,
      CompanyLogo,  
    };

    const job = await AddJob.create(jobData);

    res.status(201).json({ message: "New Job Created...", job });
  } catch (err) {
    console.error('Error during Job Creation:', err);
    res.status(400).json({
      message: 'Job creation failed, please try again.',
      error: err.message
    });
  }
};




// ===========Get
const GetAllJOb = async (req, res) => {
  try {

    // const job = await AddJob.find(req.body);
    const job = await AddJob.find().populate('users.userId', 'name email');
    console.log('====================================');
 console.log(req.body);
 
    console.log('====================================');
    return res.status(201).json({ message: "Get All Data...", job });
  } catch (err) {
    console.log('Error during Job Creation:', err);
    return res.status(400).json({
      message: ' failed, please try again.',
      error: err.message
    });
  }
}

// =============DeleteJob
const DeleteJob = async (req, res) => {
 
  try {
console.log('====================================');
console.log('req.params', req.params?.id);
console.log('====================================');
    const job = await AddJob.findOne({_id: req.params.id});
    if (!job) return res.status(404).json({ error: "Job not found" });
    await job.deleteOne(); 
    return res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
// ======updatejob
const UpdateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const jobData = req.body;
    const job = await AddJob.findOne({ _id: id });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    Object.assign(job, jobData);
    await job.save();
    return res.status(200).json({ message: "Job updated successfully", job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

  module.exports = { AddNewJob, GetAllJOb,DeleteJob ,UpdateJob};
