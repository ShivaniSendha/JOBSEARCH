/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Screens/ShowApplyJob.css'
const ShowApplyJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [userID, setUserID] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null); // Track selected job ID
  const navigate = useNavigate();

  useEffect(() => {
    const UserData = JSON.parse(localStorage.getItem('user'));
    const userID = UserData?._id || UserData?.user?.id;
    setUserID(userID);

    if (userID) {
      axios.get(`http://localhost:8000/ApplyJob/api/jobs/applied/${userID}`)
        .then(response => {
          setAppliedJobs(response.data);
        })
        .catch(error => {
          console.error('Error fetching applied jobs:', error);
        });
    }
  }, [userID]);

  const uniqueCompanies = [...new Set(appliedJobs.map(job => job.companyName))];
  const companyCount = uniqueCompanies.length;

  const handleShowDetails = (job) => {
console.log('appliedJobs', job);
    navigate('/jobsdetails', { state: { job: job }  });
  };

  return (
    <div >
      <p className='text-primary fw-bold'>Applied Jobs ({companyCount})</p>
  
        <ul>
          {appliedJobs.map(job => (
                <div className='border border-1 text-start p-3 shadow d-flex '>
            <li key={job._id}>
                <img className='companyNamelogo' src="https://cdn.prod.website-files.com/631ec5866e474e5b101f6a41/65aa51a8a1a3470ad359f9ca_Softude_Logo.svg" alt="" />
             {/* <div className='companyNamelogo'>{job.companyName}</div>  */}
              <p>Location: {job.address}</p>
              <p>Job Type: {job.jobType}</p>
              <button 
                onClick={() => handleShowDetails(job)} // Pass job ID here
                type="button" 
                className="btn btn-outline-dark"
              >
                Show Details
              </button>
            </li>
            </div>
          ))}
        </ul>
      </div>

  );
};

export default ShowApplyJob;
