/* eslint-disable no-unused-vars */
import React from 'react'
import '../Job/LatestCards.css'
const LatestCards = (item) => {
  console.log('item', item);
  return (
    <div className='div1'>
      <div className='div'>

        <div>
          <span className="badge bg-warning w-10 p-2">{item?.jobId?.jobType}</span>
          <h1 className='fs-3 '>{item?.jobId?.companyName}</h1>
          <p>{item?.jobId?.address}</p>
        </div >
        <div>
          <h1 className='fs-3 fw-bold'>{item?.jobId?.skills[0]}</h1>
          <p>{item?.jobId?.description}</p>
        </div>
        <div className='d-flex  gap-3 container'>

          <span className="badge bg-primary w-10">Position {item?.jobId?.vacancies}</span>





          <span className="badge bg-primary w-10">{item?.jobId?.salaryRange}</span>
          <span className="badge bg-primary w-10">{item?.jobId?.salaryRange}</span>


        </div>
      </div>

    </div>
  )
}

export default LatestCards
