/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import LatestCards from '../../Component/Job/LatestCards';
import Navbar from '../Navbar/Navbar';

import axios from 'axios'

const LatestJob = () => {

  const [jobs, setJobs] = useState([]);
  const [jobaplly, setJobApply] = useState([]);
  const UserData = JSON.parse(localStorage.getItem('user'));
  const userID = UserData?._id || UserData?.user?.id;

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
 getData();
}, [])


const getData = async () => {
  try {
    const response = await fetch('http://localhost:8000/Addnewjob/getAlljob');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    setJobs(jsonData?.job || []); // Set an empty array if jsonData.job is undefined
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data when component mounts

useEffect(() => {
  axios
    .post("http://localhost:8000/ApplyJob/api/jobs/getJobApplied", {
      userId: userID,
      status: 'applied', // Provide default or dynamic values
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    })
    .then((result) => {
      console.log(result.data.result);
      setJobApply(result.data.result);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  return (
    <>
      <section className='p-5' id="top-jobs">
        <div className="container mt-4  d-flex flex-column justify-content-around align-items-center ">
          <h1>
            <span className="text-primary ">Latest & Top</span> Job Openings
          </h1>
          <div className='div2'>
            {jobs && jobs?.map((item, index) => (

              <div className="col-md-3 mb-4 " key={index} >
                <LatestCards jobId={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestJob;
