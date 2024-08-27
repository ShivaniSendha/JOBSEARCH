/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import logo from '../assets/carousel1.jpg';
import shivani from '../assets/shivani.png';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLongArrowAltRight } from 'react-icons/fa';
import '../Screens/ProfileUpdate.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';
import { IoIosContact } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
import { BiDetail } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';

const ProfileUpdate = () => {
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleRemovelocalData = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/home');
  };

  const HomeClick = () => {
    navigate('/home');
  };
  const showuserDetail = () => {
    navigate('/showprofile')
  }
  const handleClickJobdetails = () => {
  
    navigate('/profileupdate');


    setTimeout(() => {
      const section = document.getElementById('top-jobs');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleSweetAlertProfileUpdate = () => {
    Swal.fire('Success!', 'Profile Updated Successfully', 'success');
  };
  const handleSweetAlertProfiledelete = () => {
    Swal.fire('Success!', 'Account deleted Successfully', 'success');
  };

  const tglPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const UserData = JSON.parse(localStorage.getItem('user'));
  const userID = UserData?._id || UserData?.user?.id;
  const userName = UserData?.name || UserData?.user?.name;
  const userEmail = UserData?.email || UserData?.user?.email;
console.log("dsdjkfjdsfdjsf",userEmail)
  const [profileData, setProfileData] = useState({
    name: '',
    email: userEmail,
    password: '',
    phoneNo: '',
    address: '',
    gender: '',
    language: '',
    dob: '',
    facebook: '',
    twitter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

 

  const validatePassword = (password) => {
    return /^\d{5,}$/.test(password);
  };

  const collectData = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      phoneNo,
      address,
      gender,
      language,
      dob,
      facebook,
      twitter,
    } = profileData;

    toast.dismiss();

    if (!name) {
      toast.error('Please enter your name.');
      return;
    }

    if (!password) {
      toast.error('Please enter your password.');
      return;
    }
    if (!phoneNo) {
      toast.error('Please enter your Phone Number.');
      return;
    }
    if (phoneNo.length < 10) {
      toast.error('Phone number must be at least 10 digits long.');
      return false;
    }
    if (!address) {
      toast.error('Please enter your Address.');
      return;
    }
    if (!gender) {
      toast.error('Fill the Gender field');
      return;
    }
    if (!language) {
      toast.error('Please enter your language.');
      return;
    }
    if (!dob) {
      toast.error('Please enter your date of birth.');
      return;
    }
    if (!facebook) {
      toast.error('Please enter your facebook link.');
      return;
    }
    if (!twitter) {
      toast.error('Please enter your Twitter link.');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 5 digits long and contain only digits.');
      return;
    }

    try {
      const updatedProfileData = {
        name: name || 'N/A',
        email: email || 'N/A',
        password: password || 'N/A',
        phoneNo: phoneNo || 'N/A',
        address: address || 'N/A',
        gender: gender || 'N/A',
        language: language || 'N/A',
        dob: dob || 'N/A',
        facebook: facebook || 'N/A',
        twitter: twitter || 'N/A',
      };

      const response = await fetch(`http://localhost:8000/api/updateProfile/${userID}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProfileData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();

      const updatedUserData = {
        ...UserData,
        name: result.name,
        
        password: result.password,
        phoneNo: result.phoneNo,
        address: result.address,
        gender: result.gender,
        language: result.language,
        dob: result.dob,
        facebook: result.facebook,
        twitter: result.twitter,
      };

      localStorage.setItem('user', JSON.stringify(updatedUserData));

      navigate('/showprofile');

      handleSweetAlertProfileUpdate();
    } catch (error) {
      console.error('There was a problem with the profile update:', error);
      toast.error('Profile update failed. Please try again.');
    }
  };
  const DeleteAccount = async () => {
  console.log("user id is ",userID)
  try {
    const response = await fetch(`http://localhost:8000/api/UsersDelete/${userID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('====================================');
    console.log('response', response);
    console.log('====================================');

    const result = await response.json(); // Inspect the result object

    if (!response.ok) {
      console.error('Response:', result); // Log the response details
      throw new Error('Network response was not ok.');
    }

    navigate('/');
    handleRemovelocalData();
    handleSweetAlertProfiledelete();
  } catch (error) {
    console.error('Error deleting account:', error);
    toast.error('Account deletion failed. Please try again.');
  }
};

  
  return (
    <>
      <Navbar />
      <div className="hero-container">
        <img src={logo} className="hero-image" alt="img" />
        <div className="hero-text">
          <h1>Profile Setting</h1>
          <div className="flex align-items-center m-3">
            <span onClick={HomeClick} className="Home btn btn-outline-success">
              Home
            </span>
            <span className="">&gt;&gt; Profile</span>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 d-flex justify-content-start align-items-center mb-4 mb-md-0 flex-column text-start  ">
            <div className=" border border-3 rounded rounded-2 d-flex flex-column  mb-3  p-5 align-items-center userlogo">
              
               <IoIosContact size={100} color='blue' className='img-fluid rounded-circle mb-3  ' />
              <FaLongArrowAltRight />
              <span className="bg-primary p-2 rounded mb-3">
                {userName ? userName.toUpperCase() : 'U'}
              </span>
              <p className="text-muted mt-2">{userEmail ? userEmail : 'U'}</p>
            </div>


            <div className='options'>
            <CiEdit size={30} color='white' />
            <button onClick={handleClickJobdetails} className=' border-0   btnoption '>Edit profile</button>
            </div>
            <div className='options'>
            <BiDetail size={30} color='white' />
            <button onClick={showuserDetail}  className='  border-0 btnoption'>Show Details</button>
            </div>
         <div className='options '>
         <MdDeleteForever size={30} color='red'  />
         <button onClick={DeleteAccount}  className=' border-0 btnoption   '>Delete Account</button>
         </div>
          
           
          </div>

          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white userinfo">
                <h4 className="mb-0 p-2">General Information</h4>
              </div>
              <div className="card-body">
                <form onSubmit={collectData}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                       placeholder="Enter your name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      readOnly
                    />

                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        name="password"
                        value={profileData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={tglPasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNo"
                      name="phoneNo"
                      value={profileData.phoneNo}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender:
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="language" className="form-label">
                      Language:
                    </label>
                    <select
                      className="form-select"
                      id="language"
                      name="language"
                      value={profileData.language}
                      onChange={handleChange}
                    >
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>

                 

                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      value={profileData.dob}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="facebook" className="form-label">
                      Facebook:
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="facebook"
                      name="facebook"
                      value={profileData.facebook}
                      onChange={handleChange}
                      placeholder="Enter Facebook profile link"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="twitter" className="form-label">
                      Twitter:
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="twitter"
                      name="twitter"
                      value={profileData.twitter}
                      onChange={handleChange}
                      placeholder="Enter Twitter profile link"
                    />
                  </div>

                  <button
                   onClick={collectData} type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
export default ProfileUpdate;
