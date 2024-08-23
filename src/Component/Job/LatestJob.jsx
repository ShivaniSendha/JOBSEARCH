/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import LatestCards from '../../Component/Job/LatestCards';
import Navbar from '../Navbar/Navbar';



const LatestJob = () => {

  const [jobs, setJobs] = useState([]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getData()

  }, [])

  const getData = async () => {
    fetch('http://localhost:8000/Addnewjob/getAlljob')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData =>

        setJobs(jsonData?.job)
      )
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


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
