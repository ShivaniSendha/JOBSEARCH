import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import Navbar from '../Component/Navbar/Navbar';
import '../../src/Screens/ShowAppliedJob.css'
import DownloadResume from '../Component/DownLoadResume';
import ScheduleInterviewModal from '../Component/ScheduleInterviewModal';

const ShowAppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching applied jobs...");
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/Addnewjob/getAlljob');
        const data = await response.json();
        console.log("Data fetched:", data);
        setAppliedJobs(data.job || []);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };
  
    fetchAppliedJobs();
  }, []);  // Empty dependency array
  
  console.log("appliedJobs:", appliedJobs);
  console.log("selectedApplication:", selectedApplication);
  console.log("showModal:", showModal);
  
  const handleJobClick = (job) => {
    navigate('/jobsdetails', { state: { job } });
  };

  const handleScheduleInterview = (userApplication, jobId) => {
    setSelectedApplication({ userApplication, jobId });
    setShowModal(true);  // Ensure this is only toggled when necessary
  };
  

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '100px' }}>
        <h2>Applied Jobs:</h2>
        <div className="row" style={{ marginTop: '80px' }}>
        {appliedJobs.length > 0 ? (
  appliedJobs.filter(job => job.users && job.users.length > 0).map((job) => (
    job.users.map((userApplication) => (
      <div key={`${job._id}-${userApplication.userId?._id}`} className="col-md-6 mb-4">
        <div className="card p-3 Appliedjob">
       
          <h3 className='companyNamelogo'>{job.companyName}</h3>
          <p><IoLocationSharp color='green' size={20} /> {job.address}</p>
          <div className="row mb-3">
            <div className="col-12">
              <p>User Id: {userApplication.userId ? userApplication.userId._id : 'N/A'}</p>
              <p>UserName: {userApplication.userId ? userApplication.userId.name : 'N/A'}</p>
              <p className='fw-bold'>Email: {userApplication.userId ? userApplication.userId.email : 'N/A'}</p>
              <p>Status: <span className='text-success'>{userApplication.status}</span></p>
              <p>Applied On: {new Date(userApplication.date).toLocaleString()}</p>
              <div className='d-flex align-items-center justify-content-between '>
                {!userApplication.resume ? null : (
                  <>
                    <p>Resume: {userApplication.resume}</p>
                    <DownloadResume 
                      resumeUrl={`http://localhost:8000/resume/download/${userApplication.resume}`}
                      filename={userApplication.resume}
                    />
                  </>
                )}
                <button 
                  onClick={() => handleScheduleInterview(userApplication, job._id)} 
                  className="btn btn-primary mt-2"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => handleJobClick(job)} className="btn btn-primary UpdateModal">
            View Details
          </button>
        </div>
      </div>
    ))
  ))
) : (
  <p>No jobs have been applied to yet.</p>
)}

        </div>
        {showModal && 
  <ScheduleInterviewModal 
    userApplication={selectedApplication.userApplication} 
    jobId={selectedApplication.jobId} 
    onClose={() => setShowModal(false)} 
  />
}

      </div>

    </>
  );
};

export default ShowAppliedJob;
