/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import logo from '../assets/carousel1.jpg';
import shivani from '../assets/shivani.png';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLongArrowAltRight } from 'react-icons/fa';
import '../Screens/ProfileUpdate.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const HomeClick = () => {
    navigate('/');
  };
  const showProfile = () => {
    navigate('/showprofile');
  };
  const handleSweetAlertProfileUpdate = () => {
    Swal.fire('Success!', 'Profile Updated Successfully', 'success');
  };

  const tglPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const UserData = JSON.parse(localStorage.getItem('user'));
  console.log('hdsjdsjhd32',UserData);
  
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
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
      twitter
    } = profileData;
  
    try {
      const userId = UserData?._id; // Assuming you have the user ID stored in localStorage
  console.log("gjkhfdkghfk",userId);
  
      const response = await fetch(`http://localhost:8000/api/updateProfile/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNo,
          address,
          gender,
          language,
          dob,
          facebook,
          twitter
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const result = await response.json();
      localStorage.setItem('user', JSON.stringify(result)); // Update local storage with the updated user data
  
      navigate('/showprofile');
  
      handleSweetAlertProfileUpdate();
    } catch (error) {
      console.error('There was a problem with the profile update:', error);
      toast.error('Profile update failed. Please try again.');
    }
  };
  
  return (
    <>
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
          {/* Left Column - Photo */}
          <div className="col-md-4 d-flex justify-content-center align-items-center mb-4 mb-md-0">
            <div className="text-center border border-3 rounded rounded-2">
              <img
                src={shivani}
                alt="User Profile"
                className="img-fluid rounded-circle mb-3"
              />
              <FaLongArrowAltRight />
              <span className="bg-primary p-2 rounded mb-3">
                {UserData?.name}
              </span>
              <p className="text-muted mt-2">  {UserData?.email}</p>
              {/* You can add an upload button here if needed */}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
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
     
    </>
  )
}
export default ProfileUpdate;
