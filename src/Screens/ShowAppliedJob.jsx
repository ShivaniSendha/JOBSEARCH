import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';
import DownloadResume from '../Component/DownLoadResume';
import ScheduleInterviewModal from '../Component/ScheduleInterviewModal';

const ShowAppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/Addnewjob/getAlljob');
        const data = await response.json();
        setAppliedJobs(data.job || []);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleJobClick = (job) => {
    navigate('/jobsdetails', { state: { job } });
  };

  const handleScheduleInterview = (userApplication, jobId) => {
    setSelectedApplication({ userApplication, jobId });
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '130px' }}>
        <h2>Applied Jobs</h2>
        <div className="row">
          {appliedJobs.length > 0 ? (
            appliedJobs.filter(job => job.users && job.users.length > 0).map((job) => (
              job.users.map((userApplication) => (
                <div key={`${job._id}-${userApplication.userId._id}`} className="col-md-6 mb-4">
                  <div className="card p-3">
                    <h3 className=''>JOB ID: {job._id}</h3>
                    <h3 className='companyNamelogo'>{job.companyName}</h3>
                    <p><IoLocationSharp color='green' size={20} /> {job.address}</p>
                    <div className="row mb-3">
                      <div className="col-12">
                        <p>User Id: {userApplication.userId._id}</p>
                        <p>UserName: {userApplication.userId.name}</p>
                        <p className='fw-bold'>Email: {userApplication.userId.email}</p>
                        <p>Status: <span className='text-success'>{userApplication.status}</span></p>
                        <p>Applied On: {new Date(userApplication.date).toLocaleString()}</p>
                        <div className='d-flex align-items-center justify-content-between'>
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
                            className="btn btn-secondary"
                          >
                            Schedule Interview
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleJobClick(job)} className="btn btn-primary">
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
      <Footer />
    </>
  );
};

export default ShowAppliedJob;
