import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdCastForEducation } from "react-icons/md";
import { TbBrandNem, TbMoneybag } from 'react-icons/tb';
import { IoLocationSharp } from 'react-icons/io5';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';

const ShowAppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/Addnewjob/getAlljob');
        const data = await response.json();
        console.log('Fetched data:', data); // Log the full fetched data
        setAppliedJobs(data.job || []); // Ensure jobs is an array
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []); // Empty dependency array ensures it runs only once

  const handleJobClick = (job) => {
    console.log('Selected job:', job);
    navigate('/jobsdetails', { state: { job } });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Applied Jobs</h2>
        <div className="row">
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job) => (
              <div key={job._id} className="col-md-6 mb-4">
                <div className="card p-3">
                  <h3>{job.companyName}</h3>
                  <p><IoLocationSharp size={20} /> {job.location}</p>
                 
                 

                  <div>
             
                    {job.users && job.users.length > 0 ? (
                      job.users.map((userApplication, index) => (
                        <div key={index} className="mb-3">
                          <p>User Id: {userApplication.userId._id}</p>
                          <p>User Name: {userApplication.userId.name}</p>
                          <p >Status: <span className='text-success'>{userApplication.status}</span></p>
                          <p>Applied On: {new Date(userApplication.date).toLocaleString()}</p> {/* Format the date */}
                        </div>
                      ))
                    ) : (
                      <p>No users have applied for this job yet.</p>
                    )}
                  </div>
                  <button onClick={() => handleJobClick(job)} className="btn btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs have been applied to yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowAppliedJob;
