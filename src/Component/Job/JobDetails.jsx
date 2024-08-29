/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import logo from '../../assets/logoReg.avif';
import { MdCastForEducation, MdOutlinePhoneAndroid, MdOutlineTimeline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaLongArrowAltRight, FaRegUser } from 'react-icons/fa';
import { TbBrandNem, TbMoneybag } from 'react-icons/tb';
import '../Job/JobDetails.css';
import { IoLocationSharp, IoTimeSharp } from 'react-icons/io5';
import Map from '../Map';
import Footer from '../Footer/Footer.jsx';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { CiTimer } from 'react-icons/ci';

const JobDetails = (item) => {

  console.log('item', item);

  const alreadyApply = () => {
    Swal.fire({
      icon: "warning",
      text: "Already You Have Applied ",

    });
  }
  const navigate = useNavigate();

  const JobDetailss = () => {
    navigate('/jobsdetails', { state: { job: item.jobId } });
  };

  navigate('/job-details', { state: { job: JobDetailss } });
  const { state } = useLocation();
  const job = state?.job;

  const UserData = JSON.parse(localStorage.getItem('user'));
  const userID = UserData?._id || UserData?.user?.id;
  const userEmail = UserData?.email || UserData?.user?.email;
  console.log('userID', userID);


  console.log('Job Status:', job?.status);
  const HomeClick = () => {
    navigate('/home');
  };

  const OpeningHours = {
    Monday: '9 AM - 5 PM',
    Tuesday: '9 AM - 5 PM',
    Wednesday: '9 AM - 5 PM',
    Thursday: '9 AM - 5 PM',
    Friday: '9 AM - 5 PM',
    Saturday: 'Closed',
    Sunday: 'Closed'
  };

  const handleApply = async () => {
    if (!UserData) {


      setTimeout(() => {

        Swal.fire({
          icon: "info",

          text: "Firsty You Have Sign up & Login",

        });

      }, 500);
    }
    else {
      try {
        const response = await fetch('http://localhost:8000/ApplyJob/api/jobs/apply', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jobId: job._id, status: 'Applied', userId: userID }),
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Apply Succesfully",

          });
          navigate('/home')
        } else {
          toast.error(data.message || 'Failed to apply');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred');
      }
    };
  }

  return (
    <>
      <Navbar />
      <div className="hero-container">
        <img src={logo} className="hero-image" alt="img" />
        <div className="hero-text">
          <h1>Job Details</h1>
          <div className="flex align-items-center m-3">
            <span onClick={HomeClick} className="Home btn btn-outline-success">
              Home
            </span>
            <span className="mx-2">&gt;&gt; Job Details</span>
          </div>
        </div>
      </div>

      <div className="container text-center">
        <div className="row">
          <div className="container text-center mt-4 ">
            <div className="row justify-content-center">
              {/* First Column */}
              <div className="First col-md-8 mb-4 d-flex justify-content-evenly">
                <div className="border-end p-4 First1 ">
                  {job ? (
                    <div className="card1 p-3">
                      <h2 className="fs-2">{job?.skills}</h2>
                      <p><strong>Company:</strong> {job?.companyName}</p>
                      <p><strong>Address:</strong> {job?.address}</p>

                      {userEmail==='admin@gmail.com' ? null :
                        job?.users?.some(user => user.userId === userID) ? (
                          <button onClick={alreadyApply} disabled={false} className="btn btn-success">Apply now</button>
                        ) : (
                          <button onClick={handleApply} className="btn btn-primary">Apply Now</button>
                        )
                      }



                    </div>
                  )

                    : (
                      <p>No job details available.</p>
                    )}
                </div>

                {/* Second Column */}
                <div className="col-md-4 mb-4">
                  <div className="First p-4">
                    {job ? (
                      <div className="First p-3">
                        <div className="d-flex align-items-center justify-content-start mb-3">
                          <TbMoneybag size={25} />
                          <p className="mb-0 ms-2">{job.salaryRange}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-start mb-3">
                          <MdOutlinePhoneAndroid size={25} />
                          <p className='mb-0 ms-2'>+91 {job.phoneNo}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-start mb-3">
                          <MdEmail size={25} />
                          <p className='mb-0 ms-2'>{job.email}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-start mb-3">
                          <MdCastForEducation size={25} />
                          <p className='jobType p-2 mb-0 ms-2'>{job.qualification}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-start mb-3">
                          <TbBrandNem size={25} />
                          <p className="mb-0 ms-2">{job.experience}</p>
                        </div>
                      </div>
                    ) : (
                      <p>No job details available.</p>
                    )}
                  </div>
                </div>

                {/* Job Description */}
                <div className="container-fluid mt-4 rounded job p-4 ">
                  <div className="d-flex align-items-center bg-dark rounded ">
                    <h1 className="ms-2 text-light fs-4 p-2">Job Description</h1>
                  </div>
                  <p className='text-start'>
                    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum".
                  </p>
                </div>

                {/* Skills */}
                <div className="container-fluid mt-4 rounded job p-4">
                  <div className="d-flex align-items-center fs-2 bg-dark rounded">
                    <h1 className="ms-2 text-light fs-4 p-2">Job Skill</h1>
                  </div>
                  <p className='text-start'>
                    <FaLongArrowAltRight /> Contrary to popular belief, Lorem Ipsum is not simply random text <br />
                    <FaLongArrowAltRight /> Latin professor at Hampden-Sydney College in Virginia <br />
                    <FaLongArrowAltRight /> looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage ideas <br />
                    <FaLongArrowAltRight /> The standard chunk of Lorem Ipsum used since the 1500s is reproduced <br />
                    <FaLongArrowAltRight /> accompanied by English versions from the 1914 translation by H. Rackham
                  </p>
                </div>

                {/* Requirements */}
                <div className="container-fluid mt-4 rounded job p-4">
                  <div className="d-flex align-items-center fs-2 bg-dark rounded">
                    <h1 className="ms-2 text-light fs-4 p-2">Requirements</h1>
                  </div>
                  <p className='text-start'>
                    <FaLongArrowAltRight /> There are many variations of passages of Lorem Ipsum available simply random text <br />
                    <FaLongArrowAltRight /> you need to be sure there isn't anything embarrassing hidden <br />
                    <FaLongArrowAltRight /> generators on the Internet tend to repeat predefined chunks as necessary <br />
                    <FaLongArrowAltRight /> making this the first true generator on the Internet It uses a dictionary <br />
                    <FaLongArrowAltRight /> Ability to solve problems creatively and effectively <br />
                    <FaLongArrowAltRight /> combined with a handful of model sentence structures <br />
                    <FaLongArrowAltRight /> standard chunk of Lorem Ipsum used since the 1500s is reproduced
                  </p>
                </div>

                {/* Location */}

                <div className="container-fluid mt-4  rounded Map ">
                  <div className="d-flex align-items-center fs-2 bg-dark rounded">

                    <h1 className="ms-2 text-light fs-4 p-2 ">Location</h1>
                  </div>
                  <div className='mt-2'>   <Map /></div>

                </div>
              </div>
              {/* Third Column */}
              <div className="col-md-4 mb-4">
                {/* Location Section */}
                <div className="container-fluid mt-4">
                  <div className="d-flex align-items-center justify-content-start bg-dark">
                    <IoLocationSharp size={40} color='green' />
                    <h1 className="ms-2 text-light fs-4 p-2">Location</h1>
                  </div>
                  {job ? (
                    <div className="card3 p-3 ">
                      <div className="d-flex align-items-center justify-content-start mb-3">
                        <TbMoneybag size={25} />
                        <p className="mb-0 ms-2">Package: {job.salaryRange}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-3">
                        <MdOutlinePhoneAndroid size={25} />
                        <p className='mb-0 ms-2'>+91 {job.phoneNo}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-3">
                        <MdEmail size={25} />
                        <p className='mb-0 ms-2'>{job.email}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-3">
                        <MdCastForEducation size={25} />
                        <p className='jobType p-2 mb-0 ms-2'>{job.qualification}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-3">
                        <TbBrandNem size={25} />
                        <p className="mb-0 ms-2">{job.experience}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-3">
                        <CiTimer size={25} />
                        <p className="mb-0 ms-2">{job.jobType}</p>
                      </div>
                    </div>
                  ) : (
                    <p>No job details available.</p>
                  )}
                </div>

                {/* Opening Hours Section */}
                <div className="container-fluid mt-4">
                  <div className="d-flex align-items-center justify-content-start bg-dark">
                    <IoTimeSharp size={40} color='green' />
                    <h1 className="ms-2 text-light fs-4 p-2">Opening Hours</h1>
                  </div>
                  {job ? (
                    <div className="card3 p-3 ">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className='fs-5'>Monday</p>
                        <p className="">{OpeningHours.Monday}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className='fs-5'>Tuesday</p>
                        <p>{OpeningHours.Tuesday}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className='fs-5'>Thursday</p>
                        <p>{OpeningHours.Thursday}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className='fs-5'>Friday</p>
                        <p>{OpeningHours.Friday}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className='fs-5'>Saturday</p>
                        <p className='text-danger'>{OpeningHours.Saturday}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className='fs-5'>Sunday</p>
                        <p className='text-danger'>{OpeningHours.Sunday}</p>
                      </div>
                    </div>
                  ) : (
                    <p>No job details available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default JobDetails;
