/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import LatestCards from '../../Component/Job/LatestCards';



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
    <div className="container mt-4  d-flex flex-column justify-content-around align-items-center ">
      <h1>
        <span className="text-primary ">Latest & Top</span> Job Openings
      </h1>
      <div className="row mt-3 p-2 d-flex  justify-content-around align-items-center  ">
        {jobs && jobs?.map((item, index) => (

          <div className="col-md-3 mb-4 " key={index} >
            <LatestCards jobId={item} />
          </div>
        ))}
      </div>
    </div >
  );
};

export default LatestJob;
