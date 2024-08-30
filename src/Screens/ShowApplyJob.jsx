/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Screens/ShowApplyJob.css'
import { IoLocationSharp } from 'react-icons/io5';

import { MdAccessTimeFilled } from 'react-icons/md';
const ShowApplyJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [userID, setUserID] = useState(null);

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

    navigate('/jobsdetails', { state: { job: job }  });
  };

  const UserData = JSON.parse(localStorage.getItem('user'));
  
  const userEmail = UserData?.email || UserData?.user?.email;

  return (
    <div >
      {
        userEmail==='admin@gmail.com' ? null :
    
          <p className='text-primary fw-bold'>Applied Jobs ({companyCount})</p>
          
      }
        <ul>
          {appliedJobs.map(job => (
                <div className='border border-1 text-start p-3 shadow   '>
            <li key={job._id}>
               
                <div className='jobicn'>
             <p className='companyNamelogo'>{job.companyName}</p> 
             <div className='d-flex flex-column jobicn1 '>
              <p className=''>  <IoLocationSharp size={22} color='green' />{job.address}</p>
              <p className='ms-1'><MdAccessTimeFilled size={18} color='green' /> {job.jobType}</p>
              </div>
              </div>
              <button 
                onClick={() => handleShowDetails(job)} 
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
