/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../Job/LatestCards.css'
import { useNavigate } from 'react-router-dom';

const LatestCards = (item) => {
  const navigate = useNavigate();
  console.log('item123', item);

  const [active, setActive] = useState();

  const UserData = JSON.parse(localStorage.getItem('user'));
  const userstatus = UserData?.status || UserData?.user?.status;
  const JobDetails = () => {
    
    navigate('/jobsdetails', { state: { job: item.jobId } });
  
  };
  return (
    <>

      <div className='div'>

        <div>
          <span className={`badge bg-warning w-10 p-2 ${active}?item?.jobId?.jobType==="Full Time"?"bg-success":"bg-primary" }`}>{item?.jobId?.jobType}</span>
          <h1 className='fs-3 '>{item?.jobId?.companyName}</h1>
          <p>{item?.jobId?.address}</p>
        </div >
        <div>
          <h1 className='fs-3 fw-bold'>{item?.jobId?.skills[0]}</h1>
          <p>{item?.jobId?.description}</p>
        </div>
        <div className='d-flex  gap-3 container align-items-center'>
          <span className="badge bg-primary w-10">Position {item?.jobId?.vacancies}</span>
          <span className="badge bg-primary w-10">{item?.jobId?.salaryRange}</span>
          <span className="badge bg-primary w-10">{item?.jobId?.experience}</span>

          <button onClick={JobDetails} type="button" className="btn btn-outline-dark">Show Details </button>
          {
            item?.jobId.status && <p className='text-success mt-3'>Applied</p>
          }

        </div>
      </div>
     
    </>
  )
}

export default LatestCards
