/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import LatestCards from '../../Component/Job/LatestCards'; // Adjust the import path as needed
import axios from 'axios';
import SearchInput from '../SearchInput';
import nojob from '../../assets/oops.png'; // Update this path to your actual image

const LatestJob = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const jobSectionRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Addnewjob/getAlljob');
        setJobs(response.data?.job || []);
        setFilteredJobs(response.data?.job || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = jobs.filter(job =>
      job.companyName.toLowerCase().includes(lowercasedTerm) ||
      job.jobType.toLowerCase().includes(lowercasedTerm) ||
      job.address.toLowerCase().includes(lowercasedTerm)||
      job.skills[0].toLowerCase().includes(lowercasedTerm)
    );
    setFilteredJobs(filtered);

  
    if (jobSectionRef.current) {
      jobSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
       <div className="container mt-4 d-flex flex-column justify-content-around align-items-center">
       <h1>
            <span className="text-primary">Latest & Top</span> Job Openings
          </h1>
      <SearchInput onSearch={handleSearch} />
      <section className='' id="top-jobs" ref={jobSectionRef}>
       
         
          {loading ? (
            <p >Loading jobs...</p>
          ) : (
            <>
              {filteredJobs.length > 0 ? (
                <div className='div2 row'>
                  {filteredJobs.map((item) => (
                    <div
                      className="col-md-3 mb-4"
                      key={item._id}
                    >
                      <LatestCards jobId={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='no-jobs'>
                  <img
                    src={nojob}
                    alt="No jobs available"
                    className="img-fluid"
                  />
                  <p className='fw-bold fs-1 text-center'>No jobs found.</p>
                </div>
               )}
            </>
          )}
     
      </section>
    </div>
    </div>
  );
};

export default LatestJob;
