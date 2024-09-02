



const AddJob = require('../Modules/AddJob');


const ApplyJOb = async (req, res) => {
  const { userId, jobId, status, date, time } = req.body;

  try {

    const job = await AddJob.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    
    job.users.push({
      userId: userId,
      status: status,
      date: new Date(date),  
      time: time,
    });
    
    const userDate = new Date(date);
    
    if (isNaN(userDate.getTime())) {
      console.error('Invalid Date:', date);
    
      job.users[job.users.length - 1].date = new Date(); 
    } else {
      job.users[job.users.length - 1].date = userDate; 
    }
    
    await job.save()

    console.log("job", job);

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






module.exports ={ ApplyJOb,getJobAppliedSatus,GetJobApply};
