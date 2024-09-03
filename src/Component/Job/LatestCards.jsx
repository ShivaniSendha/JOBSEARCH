
import React from 'react';
import '../Job/LatestCards.css';
import { useNavigate } from 'react-router-dom';

const LatestCards = (item) => {
  const navigate = useNavigate();

  const UserData = JSON.parse(localStorage.getItem('user'));
  const userId = UserData?._id || UserData?.user?.id;

  const JobDetails = () => {
    navigate('/jobsdetails', { state: { job: item.jobId } });
  };

  const hasApplied = item?.jobId?.users?.some(application => application.userId === userId && application.status === 'Applied');

  return (
    <>
      <div className='div'>
  <div>
  <span
      className={`badge w-10 p-2 ${
        item?.jobId?.jobType === "Full-Time"
          ? "bg-primary"
          : item?.jobId?.jobType === "Part-Time"
          ? "bg-warning"
          : item?.jobId?.jobType === "Internship"
          ? "bg-success" 
          : "bg-primary"
      }`}
    >
      {item?.jobId?.jobType}
    </span>
    <h1 className='fs-3'>{item?.jobId?.companyName}</h1>
    <p>{item?.jobId?.address}</p>



          <h1 className='fs-3 fw-bold'>{item?.jobId?.skills[0]}</h1>
          <p>{item?.jobId?.description}</p>
        </div>
        <div className='d-flex gap-3 container align-items-center'>
          <span className="badge bg-primary w-10">Position {item?.jobId?.vacancies}</span>
          <span className="badge bg-primary w-10">{item?.jobId?.salaryRange}</span>
          <span className="badge bg-primary w-10">{item?.jobId?.experience}</span>

          <button onClick={JobDetails} type="button" className="btn btn-outline-dark">Show Details</button>
          {hasApplied ? <p className='text-success mt-2'>Applied</p> : null}
        </div>
      </div>
    </>
  );
};

export default LatestCards;
