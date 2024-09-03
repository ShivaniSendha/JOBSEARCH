



const AddJob = require('../Modules/AddJob');


const ApplyJOb = async (req, res) => {

  console.log("inside ApplyJob ");
  
  const { userId, jobId, date, time } = req.body;
  const resume = req.file ? req.file.path : null;
  console.log("req.body :", req.body);
  
  try {
console.log("step1");

    const job = await AddJob.findById(jobId);
    console.log("step2");
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log("step3");
    const existingApplication = job.users.find(application => application.userId.toString() === userId);
    console.log("existing :", existingApplication);
    
    if (existingApplication) {
      console.log("existing job");
      
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    console.log("step4");
  
    job.users.push({
      userId: userId,
      status: "Applied",
      date: new Date(), // Current date and time
      time: new Date().toLocaleTimeString(),
      resume: resume,
      interviewDate: new Date(),
    });

    console.log("step5");
    await job.save();
    // console.log("step6");
    console.log("Updated job:", job);

    res.status(200).json({ message: 'Application successful', job });
  } catch (error) {
    res.status(500).json({ message: 'Error applying for job', error: error.message });
  }
};



const getJobAppliedSatus = (req,res,next)=>{
  const {userId} = req.body
    AddJob.find({userId}).then(result=>{
      console.log(result)
      return res.status(200).json({message:"Data...",result})
    }).catch(err=>{
      console.log(err);
      return res.status(401).json({message:"Something went wrong...",err})
    });
}
// =====================GetApplyjob=======================
// ============================================

const GetJobApply=async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await AddJob.find({ 'users.userId': userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applied jobs', error: error.message });
  }
}



const findUserInJob = async (req, res, next) => {
  console.log(req.params);
  const { userId } = req.params;

  try {
    // Find the job by jobId (assuming jobId is provided in req.params or req.body)
    const job = await AddJob.findOne({ "users.userId": userId });
    console.log('jobsss',job);
    if (!job.users) {
      console.log("User not found in any job.");
      return res.status(404).json({ message: 'User not found in any job' });
    }

    console.log("User found in job.");
    return res.status(200).json({ message: 'User found in job' });
  } catch (error) {
    console.error("Error finding user in job:", error);
    return res.status(500).json({ message: 'Error finding user in job', error: error.message });
  }
};



module.exports ={ ApplyJOb,getJobAppliedSatus,GetJobApply,findUserInJob};
