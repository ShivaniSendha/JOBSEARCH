//  /* eslint-disable no-unused-vars */
//  import React, { useEffect, useState } from 'react';
//  import { useLocation, useNavigate } from 'react-router-dom';
//  import Navbar from '../Navbar/Navbar';
//  import logo from '../../assets/logoReg.avif';
//  import { MdCastForEducation, MdOutlinePhoneAndroid, MdOutlineTimeline, MdEmail } from "react-icons/md";
//  import { FaLongArrowAltRight } from 'react-icons/fa';
//  import { TbBrandNem, TbMoneybag } from 'react-icons/tb';
//  import { IoLocationSharp, IoTimeSharp } from 'react-icons/io5';
//  import Map from '../Map';
//  import Footer from '../Footer/Footer.jsx';
//  import { toast } from 'react-toastify';
//  import Swal from 'sweetalert2';
//  import { CiTimer } from 'react-icons/ci';
//  import axios from 'axios';

//  const JobDetails = () => {
//    const navigate = useNavigate();
//    const location = useLocation();
//    const job = location.state?.job;
//    const [jobs, setJobs] = useState(null);

//    const [userEmails, setUserEmails] = useState('');
//    const [userIDs, setUserIDs] = useState('');
//    const UserData = JSON.parse(localStorage.getItem('user'));
//    const userID = UserData?._id || UserData?.user?.id;
//    const userEmail = UserData?.email || UserData?.user?.email;

//    const [jobStatus, setJobStatus] = useState(false);
//    useEffect(() => {

//      setUserIDs(UserData?._id || UserData?.user?.id);
//      setUserEmails(UserData?.email || UserData?.user?.email);
//    }, []);

//    useEffect(() => {
//      if (userID && job) {
//        axios.get(`http:localhost:8000/ApplyJob/api/jobs/find-user/${userID}`)
//          .then(result => {
//            console.log('API response:', result.data);

//            if (result.status === 200 && result.data.applied) {
//              setJobStatus(true);
//            } else {
//              setJobStatus(false);
//            }
//          })
//          .catch(err => {
//            console.error('Error checking job status:', err);
//            setJobStatus(false);
//          });
//      }
//    }, [userID, job]);

//    const handleApply = async () => {
//      if (!userID) {
//        Swal.fire({
//          icon: 'info',
//          text: 'Please sign up and log in first.',
//        });
//        return;
//      }

//      try {
//        const response = await fetch('http:localhost:8000/ApplyJob/api/jobs/apply', {
//          method: 'PATCH',
//          headers: {
//            'Content-Type': 'application/json',
//          },
//          body: JSON.stringify({ jobId: job._id, status: 'Applied', userId: userID }),
//        });

//        const data = await response.json();

//        if (response.ok) {
//          Swal.fire({
//            icon: 'success',
//            title: 'Success...',
//            text: 'Application submitted successfully.',
//          });
//          setJobStatus(true);  //Update jobStatus after successful application
//        } else {
//          Swal.fire({
//            icon: 'error',
//            title: 'Error...',
//            text: data.message || 'Failed to apply',
//          });
//        }
//      } catch (error) {
//        console.error('Error:', error);
//        Swal.fire({
//          icon: 'error',
//          title: 'Error...',
//          text: 'An error occurred',
//        });
//      }
//    };

//    console.log('aoolysrar', jobStatus);

//    const OpeningHours = {
//      Monday: '9 AM - 5 PM',
//      Tuesday: '9 AM - 5 PM',
//      Wednesday: '9 AM - 5 PM',
//      Thursday: '9 AM - 5 PM',
//      Friday: '9 AM - 5 PM',
//      Saturday: 'Closed',
//      Sunday: 'Closed'
//    };

//    return (
//      <>
//        <Navbar />
//        <div className="hero-container">
//          <img src={logo} className="hero-image" alt="logo" />
//          <div className="hero-text">
//            <h1>Job Details</h1>
//            <div className="flex align-items-center m-3">
//              <span onClick={() => navigate('/home')} className="Home btn btn-outline-success">
//                Home
//              </span>
//              <span className="mx-2">&gt;&gt; Job Details</span>
//            </div>
//          </div>
//        </div>

//        <div className="container text-center">
//          <div className="row">
//            <div className="container text-center mt-4">
//              <div className="row justify-content-center">
//                {/* First Column */}
//                <div className="First col-md-8 mb-4 d-flex justify-content-evenly">
//                  <div className="border-end p-4 First1">
//                    {job ? (
//                      <div className="card1 p-3">
//                        <h2 className="fs-2">{job.skills.join(', ')}</h2>
//                        <p className='companyNamelogo'>{job.companyName}</p>
//                        <p><strong>Address:</strong> {job.address}</p>

//                        {/* Check if user is admin */}
//                        {userEmail === 'admin@gmail.com' ? null : (
//                          job?.users?.some(user => user.userId === userID) ? (
//                            <button disabled className="btn btn-danger">Applied</button>
//                          ) : (
//                            <button onClick={handleApply} className="btn btn-primary">Apply Now</button>
//                          )
//                        )}
//                      </div>
//                    ) : (
//                      <p>No job details available.</p>
//                    )}

//                  </div>
//                  {/* Second Column */}
//                  <div className="col-md-4 mb-4">
//                    <div className="First p-4">
//                      {job ? (
//                        <div className="First p-3">
//                          <div className="d-flex align-items-center justify-content-start mb-3">
//                            <TbMoneybag size={25} />
//                            <p className="mb-0 ms-2">{job.salaryRange}</p>
//                          </div>
//                          <div className="d-flex align-items-center justify-content-start mb-3">
//                            <MdOutlinePhoneAndroid size={25} />
//                            <p className='mb-0 ms-2'>+91 {job.phoneNo}</p>
//                          </div>
//                          <div className="d-flex align-items-center justify-content-start mb-3">
//                            <MdEmail size={25} />
//                            <p className='mb-0 ms-2'>{job.email}</p>
//                          </div>
//                          <div className="d-flex align-items-center justify-content-start mb-3">
//                            <MdCastForEducation size={25} />
//                            <p className='jobType p-2 mb-0 ms-2'>{job.qualification}</p>
//                          </div>
//                          <div className="d-flex align-items-center justify-content-start mb-3">
//                            <TbBrandNem size={25} />
//                            <p className="mb-0 ms-2">{job.experience}</p>
//                          </div>
//                        </div>
//                      ) : (
//                        <p>No job details available.</p>
//                      )}
//                    </div>
//                  </div>

//                  {/* Job Description */}
//                  <div className="container-fluid mt-4 rounded job p-4">
//                    <div className="d-flex align-items-center bg-dark rounded">
//                      <h1 className="ms-2 text-light fs-4 p-2">Job Description</h1>
//                    </div>
//                    <p className='text-start'>
//                      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum".
//                    </p>
//                  </div>

//                  {/* Skills */}
//                  <div className="container-fluid mt-4 rounded job p-4">
//                    <div className="d-flex align-items-center fs-2 bg-dark rounded">
//                      <h1 className="ms-2 text-light fs-4 p-2">Job Skills</h1>
//                    </div>
//                    <p className='text-start'>
//                      <FaLongArrowAltRight /> Contrary to popular belief, Lorem Ipsum is not simply random text <br />
//                      <FaLongArrowAltRight /> Latin professor at Hampden-Sydney College in Virginia <br />
//                      <FaLongArrowAltRight /> Looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage ideas <br />
//                      <FaLongArrowAltRight /> The standard chunk of Lorem Ipsum used since the 1500s is reproduced <br />
//                      <FaLongArrowAltRight /> Accompanied by English versions from the 1914 translation by H. Rackham
//                    </p>
//                  </div>

//                  {/* Requirements */}
//                  <div className="container-fluid mt-4 rounded job p-4">
//                    <div className="d-flex align-items-center fs-2 bg-dark rounded">
//                      <h1 className="ms-2 text-light fs-4 p-2">Requirements</h1>
//                    </div>
//                    <p className='text-start'>
//                      <FaLongArrowAltRight /> There are many variations of passages of Lorem Ipsum available simply random text <br />
//                      <FaLongArrowAltRight /> You need to be sure there isn't anything embarrassing hidden <br />
//                      <FaLongArrowAltRight /> Generators on the Internet tend to repeat predefined chunks as necessary <br />
//                      <FaLongArrowAltRight /> Making this the first true generator on the Internet. It uses a dictionary <br />
//                      <FaLongArrowAltRight /> Ability to solve problems creatively and effectively <br />
//                      <FaLongArrowAltRight /> Combined with a handful of model sentence structures <br />
//                      <FaLongArrowAltRight /> Standard chunk of Lorem Ipsum used since the 1500s is reproduced
//                    </p>
//                  </div>

//                  {/* Location */}
//                  <div className="container-fluid mt-4 rounded Map">
//                    <div className="d-flex align-items-center fs-2 bg-dark rounded">
//                      <h1 className="ms-2 text-light fs-4 p-2">Location</h1>
//                    </div>
//                    <div className='mt-2'><Map /></div>
//                  </div>
//                </div>

//                {/* Third Column */}
//                <div className="col-md-4 mb-4">
//                  {/* Location Section */}
//                  <div className="container-fluid mt-4">
//                    <div className="d-flex align-items-center justify-content-start bg-dark">
//                      <IoLocationSharp size={40} color='green' />
//                      <h1 className="ms-2 text-light fs-4 p-2">Location</h1>
//                    </div>
//                    {job ? (
//                      <div className="card3 p-3">
//                        <div className="d-flex align-items-center justify-content-start mb-3">
//                          <TbMoneybag size={25} />
//                          <p className="mb-0 ms-2">Package: {job.salaryRange}</p>
//                        </div>
//                        <div className="d-flex align-items-center justify-content-start mb-3">
//                          <MdOutlinePhoneAndroid size={25} />
//                          <p className='mb-0 ms-2'>+91 {job.phoneNo}</p>
//                        </div>
//                        <div className="d-flex align-items-center justify-content-start mb-3">
//                          <MdEmail size={25} />
//                          <p className='mb-0 ms-2'>{job.email}</p>
//                        </div>
//                        <div className="d-flex align-items-center justify-content-start mb-3">
//                          <MdCastForEducation size={25} />
//                          <p className='jobType p-2 mb-0 ms-2'>{job.qualification}</p>
//                        </div>
//                        <div className="d-flex align-items-center justify-content-start mb-3">
//                          <TbBrandNem size={25} />
//                          <p className="mb-0 ms-2">{job.experience}</p>
//                        </div>
//                        <div className="d-flex align-items-center justify-content-start mb-3">
//                          <CiTimer size={25} />
//                          <p className="mb-0 ms-2">{job.jobType}</p>
//                        </div>
//                      </div>
//                    ) : (
//                      <p>No job details available.</p>
//                    )}
//                  </div>

//                  {/* Opening Hours Section */}
//                  <div className="container-fluid mt-4">
//                    <div className="d-flex align-items-center justify-content-start bg-dark">
//                      <IoTimeSharp size={40} color='green' />
//                      <h1 className="ms-2 text-light fs-4 p-2">Opening Hours</h1>
//                    </div>
//                    <div className="card3 p-3">
//                      {Object.keys(OpeningHours).map(day => (
//                        <div className="d-flex align-items-center justify-content-between mb-3" key={day}>
//                          <p className='fs-5'>{day}</p>
//                          <p className={day === 'Saturday' || day === 'Sunday' ? 'text-danger' : ''}>{OpeningHours[day]}</p>
//                        </div>
//                      ))}
//                    </div>
//                  </div>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//        <Footer />
//      </>
//    );
//  }


//  export default JobDetails;


/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import logo from '../../assets/logoReg.avif';
import { MdCastForEducation, MdOutlinePhoneAndroid, MdOutlineTimeline, MdEmail } from "react-icons/md";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { TbBrandNem, TbMoneybag } from 'react-icons/tb';
import { IoLocationSharp, IoTimeSharp } from 'react-icons/io5';
import Map from '../Map';
import Footer from '../Footer/Footer.jsx';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { CiTimer } from 'react-icons/ci';
import axios from 'axios';

const JobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;
  const [resume, setResume] = useState(null);
  const [userEmails, setUserEmails] = useState('');
  const [userIDs, setUserIDs] = useState('');
  const UserData = JSON.parse(localStorage.getItem('user'));
  const userID = UserData?._id || UserData?.user?.id;
  const userEmail = UserData?.email || UserData?.user?.email;

  const [jobStatus, setJobStatus] = useState(false);

  useEffect(() => {
    setUserIDs(UserData?._id || UserData?.user?.id);
    setUserEmails(UserData?.email || UserData?.user?.email);
  }, []);

  useEffect(() => {
    if (userID && job) {
      fetch(`http://localhost:8000/ApplyJob/api/jobs/find-user/${userID}`)
        .then(response => response.json())
        .then(result => {
          console.log('API response:', result);
          if (result.applied) {
            setJobStatus(true);
          } else {
            setJobStatus(false);
          }
        })
        .catch(err => {
          console.error('Error checking job status:', err);
          setJobStatus(false);
        });
    }
  }, [userID, job]);
  
  const handleApply = async () => {
    if (!userID) {
      Swal.fire({
        icon: 'info',
        text: 'Please sign up and log in first.',
      });
      return;
    }
  
    if (!resume) {
      Swal.fire({
        icon: 'info',
        text: 'Please upload your resume.',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('jobId', job._id);
    formData.append('status', 'Applied');
    formData.append('userId', userID);
    formData.append('resume', resume);
  
    try {
      const response = await fetch('http://localhost:8000/ApplyJob/api/jobs/apply', {
        method: 'PATCH',
        body: formData,
      });
  
      const data = await response.json();
      console.log('response', response);
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Application submitted successfully.',
        });
        setJobStatus(true);  // Update jobStatus after successful application
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: data.message || 'Failed to apply',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'An error occurred',
      });
    }
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

  return (
    <>
      <Navbar />
      <div className="hero-container">
        <img src={logo} className="hero-image" alt="logo" />
        <div className="hero-text">
          <h1>Job Details</h1>
          <div className="flex align-items-center m-3">
            <span onClick={() => navigate('/home')} className="Home btn btn-outline-success">
              Home
            </span>
            <span className="mx-2">&gt;&gt; Job Details</span>
          </div>
        </div>
      </div>

      
      <div className="container text-center">
          <div className="row">
            <div className="container text-center mt-4">
              <div className="row justify-content-center">
                {/* First Column */}
                <div className="First col-md-8 mb-4 d-flex justify-content-evenly">
                  <div className="border-end p-4 First1">
                  {job ? (
                    <div className="card1 p-3">
                      <h2 className="fs-2">{job.skills.join(', ')}</h2>
                      <p className='companyNamelogo'>{job.companyName}</p>
                      <p><strong>Address:</strong> {job.address}</p>

                      {userEmail === 'admin@gmail.com' ? null : (
                        job?.users?.some(user => user.userId === userID) ? (
                          <button disabled className="btn btn-danger">Applied</button>
                        ) : (
                          <>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => setResume(e.target.files[0])}
                              className="form-control my-3"
                            />
                            <button onClick={handleApply} className="btn btn-primary">Apply Now</button>
                          </>
                        )
                      )}
                    </div>
                  ) : (
                    <p>No job details available.</p>
                  )}
                
              </div>
              {/* Other sections... */}

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
                 <div className="container-fluid mt-4 rounded job p-4">
                   <div className="d-flex align-items-center bg-dark rounded">
                     <h1 className="ms-2 text-light fs-4 p-2">Job Description</h1>
                   </div>
                   <p className='text-start'>
                     "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum".
                   </p>
                 </div>

                 {/* Skills */}
                 <div className="container-fluid mt-4 rounded job p-4">
                   <div className="d-flex align-items-center fs-2 bg-dark rounded">
                     <h1 className="ms-2 text-light fs-4 p-2">Job Skills</h1>
                   </div>
                   <p className='text-start'>
                     <FaLongArrowAltRight /> Contrary to popular belief, Lorem Ipsum is not simply random text <br />
                     <FaLongArrowAltRight /> Latin professor at Hampden-Sydney College in Virginia <br />
                     <FaLongArrowAltRight /> Looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage ideas <br />
                     <FaLongArrowAltRight /> The standard chunk of Lorem Ipsum used since the 1500s is reproduced <br />
                     <FaLongArrowAltRight /> Accompanied by English versions from the 1914 translation by H. Rackham
                   </p>
                 </div>

                 {/* Requirements */}
                 <div className="container-fluid mt-4 rounded job p-4">
                   <div className="d-flex align-items-center fs-2 bg-dark rounded">
                     <h1 className="ms-2 text-light fs-4 p-2">Requirements</h1>
                   </div>
                   <p className='text-start'>
                     <FaLongArrowAltRight /> There are many variations of passages of Lorem Ipsum available simply random text <br />
                     <FaLongArrowAltRight /> You need to be sure there isn't anything embarrassing hidden <br />
                     <FaLongArrowAltRight /> Generators on the Internet tend to repeat predefined chunks as necessary <br />
                     <FaLongArrowAltRight /> Making this the first true generator on the Internet. It uses a dictionary <br />
                     <FaLongArrowAltRight /> Ability to solve problems creatively and effectively <br />
                     <FaLongArrowAltRight /> Combined with a handful of model sentence structures <br />
                     <FaLongArrowAltRight /> Standard chunk of Lorem Ipsum used since the 1500s is reproduced
                   </p>
                 </div>

                 {/* Location */}
                 <div className="container-fluid mt-4 rounded Map">
                   <div className="d-flex align-items-center fs-2 bg-dark rounded">
                     <h1 className="ms-2 text-light fs-4 p-2">Location</h1>
                   </div>
                   <div className='mt-2'><Map /></div>
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
                     <div className="card3 p-3">
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
                   <div className="card3 p-3">
                     {Object.keys(OpeningHours).map(day => (
                       <div className="d-flex align-items-center justify-content-between mb-3" key={day}>
                         <p className='fs-5'>{day}</p>
                         <p className={day === 'Saturday' || day === 'Sunday' ? 'text-danger' : ''}>{OpeningHours[day]}</p>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       <Footer />
     </>
   );
 }


 export default JobDetails;