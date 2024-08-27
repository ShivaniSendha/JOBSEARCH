/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Job/AddJob.css'; // Your existing CSS file
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoReg.avif';
import Footer from '../Footer/Footer';

const AddJob = () => {
  const navigate = useNavigate();
  const HomeClick = () => {
    navigate('/home')
  }
  const [jobData, setJobData] = useState({
    companyName: '',
    category: '',
    location: '',
    description: '',
    salaryRange: '',
    vacancies: '',
    experience: '',
    jobType: '',
    qualification: '',
    skills: '',
    email: '',
    phoneNo: ' ',
    address: ' ',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    status: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('111', name, value);
    setJobData({
      ...jobData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!jobData.companyName) {
      toast.error('Company Name is required');
      return false;
    }
    if (!jobData.category) {
      toast.error('Category is required');
      return false;
    }
    if (!jobData.location) {
      toast.error('Location is required');
      return false;
    }
    if (!jobData.description) {
      toast.error('Description is required');
      return false;
    }
    if (!jobData.salaryRange) {
      toast.error('Salary Range is required');
      return false;
    }
    if (!jobData.vacancies || jobData.vacancies <= 0) {
      toast.error('Number of Vacancies must be greater than 0');
      return false;
    }
    if (!jobData.experience) {
      toast.error('Experience is required');
      return false;
    }
    if (!jobData.jobType) {
      toast.error('Job Type is required');
      return false;
    }
    // =======================
    if (!jobData.email) {
      toast.error('Email is required');
      return false;
    }
    if (!jobData.category) {
      toast.error('Category is required');
      return false;
    }
    if (jobData.phoneNo.length < 10) {
      toast.error('Phone number must be at least 10 digits long.');
      return false;
    }

    if (!jobData.address) {
      toast.error('Address is required');
      return false;
    }
    if (!jobData.salaryRange) {
      toast.error('Salary Range is required');
      return false;
    }
    if (!jobData.city) {
      toast.error('City is required');
      return false;
    }
    if (!jobData.state) {
      toast.error('State is required');
      return false;
    }
    if (!jobData.country) {
      toast.error('Country  is required');
      return false;
    }
    if (!jobData.zipCode) {
      toast.error('Zip Code  is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Job Data:', jobData);

      const data = {
        companyName: jobData?.companyName,
        category: jobData?.category,
        location: jobData?.location,
        description: jobData?.description,
        salaryRange: jobData?.salaryRange,
        vacancies: jobData?.vacancies,
        experience: jobData?.experience,
        jobType: jobData?.jobType,
        qualification: jobData?.qualification,
        skills: jobData?.skills,
        email: jobData?.email,
        phoneNo: jobData?.phoneNo,
        address: jobData?.address,
        city: jobData?.city,
        state: jobData?.jobType,
        country: jobData?.country,
        zipCode: jobData?.zipCode,
      }



      try {
        const response = await fetch('http://localhost:8000/Addnewjob', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        localStorage.setItem('users', JSON.stringify(result));

        // Navigate to login page
        navigate('/');
        toast.success('Job Created Successful');
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        toast.error('JOb Created failed. Please try again.');
      }

    }
  }
  return (
    <>
      <Navbar />
      <div className="hero-container">
        <img src={logo} className="hero-image" alt="img" />
        <div className="hero-text">
          <h1>Create Job</h1>
          <div className='flex align-items-center m-3'>
            <span onClick={HomeClick} className="Home btn btn-outline-success ">Home</span> <span className="">&gt;&gt; Create Job </span>
          </div>
        </div>
      </div>
      <div className='container bg-secondary text-light fs-3 fw-bold p-2 mt-4 '>
        General Information </div>
      <div className='border border-2 container '>
        <form className="job-form " onSubmit={handleSubmit}>

          <div className="form-group ">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={jobData.companyName}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={jobData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Indore">Software Development</option>
              <option value="Mumbai">Sales and Marketing</option>

              <option value="Bangalore">Web Design</option>
              <option value="Bangalore">Project Management</option>



            </select>

          </div>
          <div className="form-group">
            <label>Location:</label>
            <select
              name="location"
              value={jobData.location}
              onChange={handleChange}

            >
              <option value="">Select Location</option>
              <option value="Indore">Indore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              {/* Add more locations as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Salary Range:</label>
            <input
              type="text"
              name="salaryRange"
              value={jobData.salaryRange}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>No. of Vacancies:</label>
            <input
              type="number"
              name="vacancies"
              value={jobData.vacancies}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Experience:</label>
            <select
              name="experience"
              value={jobData.experience}
              onChange={handleChange}

            >
              <option value="">Select Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="1-2 Years">1-2 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>
          <div className="form-group">
            <label>Job Type:</label>
            <select
              name="jobType"
              value={jobData.jobType}
              onChange={handleChange}

            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="form-group">
            <label>Qualification Required:</label>
            <input
              type="qualification "
              name="qualification"
              value={jobData.qualification}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Skills:</label>
            <select
              name="skills"
              value={jobData.skills}
              onChange={handleChange}

            >
              <option value="">Skills</option>
              <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
              <option value="SEO Specialist">SEO Specialist</option>
              <option value="Content Marketing Strategist">Content Marketing Strategist</option>
              <option value="Social Media Manager">Social Media Manager</option>
              <option value="PPC Specialist">PPC Specialist</option>
              <option value="Email Marketing Specialist">Email Marketing Specialist</option>
              <option value="Salesforce Administrator">Salesforce Administrator</option>
              <option value="Account Manager">Account Manager</option>
              <option value="Business Development Executive">Business Development Executive</option>
              <option value="Sales Executive">Sales Executive</option>
              <option value="Customer Success Manager">Customer Success Manager</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Mobile App Developer">Mobile App Developer</option>
              <option value="Python Developer">Python Developer</option>
              <option value="Java Developer">Java Developer</option>
              <option value="PHP Developer">PHP Developer</option>
              <option value="WordPress Developer">WordPress Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Cloud Engineer">Cloud Engineer</option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>

            </select>
          </div>
          {/* <button type="submit" className="submit-btn">Create Job</button> */}

        </form>
      </div>
      {/* ===================================== */}
      <div className='container bg-secondary text-light fs-3 fw-bold p-2 mt-4 '>
        Company Address </div>
      <div className='border border-2 container '>
        <form className="job-form " onSubmit={handleSubmit}>

          <div className="form-group ">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={jobData.email}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Phone Number :</label>
            <input
              type="phoneNo"
              name="phoneNo"
              value={jobData.phoneNo}
              onChange={handleChange}

            />

          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type='address'
              name="address"
              value={jobData.address}
              onChange={handleChange}

            />


          </div>
          <div className="form-group">
            <label>City:</label>
            <select
              name="city"
              value={jobData.city}
              onChange={handleChange}

            >
              <option value="">City</option>
              <option value="indore">Indore</option>
              <option value="bhopal">Bhopal</option>
              <option value="pune">Pune</option>
              <option value="chennai">Chennai</option>
            </select>
          </div>
          <div className="form-group">
            <label>State:</label>
            <select
              name="state"
              value={jobData.state}
              onChange={handleChange}

            >

              <option value="">Select State</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="RJ">Rajasthan</option>
              <option value="GJ">Gujarat</option>
              <option value="KA">Karnataka</option>
              <option value="TN">Tamil Nadu</option>
              <option value="WB">West Bengal</option>
              <option value="PB">Punjab</option>
              <option value="HR">Haryana</option>
            </select>

          </div>
          <div className="form-group">
            <label>Country:</label>
            <select
              name="country"
              value={jobData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="UK">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="BR">Brazil</option>
            </select>

          </div>
          <div className="form-group">
            <label>Zip Code:</label>
            <input
              name="zipCode"
              value={jobData.zipCode}
              onChange={handleChange}

            />

          </div>


          <button type="submit" className="submit-btn">Create Job</button>

        </form>
      </div>
      <ToastContainer />
      <Footer/>
    </>

  );

}

export default AddJob;