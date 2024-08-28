import React, { useState } from 'react';
import logo from '../assets/carousel1.jpg';
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
import ShowApplyJob from './ShowApplyJob';

const ProfileUpdate = () => {
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
    profilePic: null, // For the profile picture
  });
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
  };

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const validatePassword = (password) => {
    return /^\d{6,}$/.test(password);
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
      profilePic,
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
  
    if (!validatePassword(password)) {
      toast.error('Password must be at least 6 digits long and contain only digits.');
      return;
    }
  
    if (!phoneNo) {
      toast.error('Please enter your Phone Number.');
      return;
    }
  
    if (phoneNo.length < 10) {
      toast.error('Phone number must be at least 10 digits long.');
      return;
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
      Swal.fire("Info", 'Please enter your Facebook link.', 'info');
      return;
    }
  
    if (!twitter) {
      toast.error('Please enter your Twitter link.');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', name || 'N/A');
    formData.append('email', email || 'N/A');
    formData.append('password', password || 'N/A');
    formData.append('phoneNo', phoneNo || 'N/A');
    formData.append('address', address || 'N/A');
    formData.append('gender', gender || 'N/A');
    formData.append('language', language || 'N/A');
    formData.append('dob', dob || 'N/A');
    formData.append('facebook', facebook || 'N/A');
    formData.append('twitter', twitter || 'N/A');
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      const response = await fetch(`http://localhost:8000/api/updateProfile/${userID}`, {
        method: 'PATCH',
        body: formData,
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
        profilePic: result.profilePic, // Update with the new profile picture URL
      };

      localStorage.setItem('user', JSON.stringify(updatedUserData));

      navigate('/showprofile');
      handleSweetAlertProfileUpdate();
    } catch (error) {
      toast.error('Profile update failed. Please try again.');
    }
  };

  const DeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/UsersDelete/${userID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      navigate('/');
      handleRemovelocalData();
      handleSweetAlertProfiledelete();
    } catch (error) {
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
              <button onClick={showuserDetail} className='  border-0 btnoption'>Show Details</button>
            </div>
            <div className='options '>
              <MdDeleteForever size={30} color='red' />
              <button onClick={DeleteAccount} className=' border-0 btnoption   '>Delete Account</button>
            </div>

            <ShowApplyJob />
          </div>

          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="card-title">Profile</h4>
                <form onSubmit={collectData}>
                  <div className="form-group mb-3">
                    <label htmlFor="name">Name:</label>
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
                  {/* <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div> */}
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
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
                      <span className="input-group-text" onClick={tglPasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="phoneNo">Phone No:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNo"
                      name="phoneNo"
                      value={profileData.phoneNo}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="address">Address:</label>
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
                  <div className="form-group mb-3">
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-control"
                      value={profileData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="language">Language:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="language"
                      name="language"
                      value={profileData.language}
                      onChange={handleChange}
                      placeholder="Enter your language"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      value={profileData.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="facebook">Facebook:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="facebook"
                      name="facebook"
                      value={profileData.facebook}
                      onChange={handleChange}
                      placeholder="Enter your Facebook profile link"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="twitter">Twitter:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="twitter"
                      name="twitter"
                      value={profileData.twitter}
                      onChange={handleChange}
                      placeholder="Enter your Twitter profile link"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="profilePic">Profile Picture:</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilePic"
                      name="profilePic"
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileUpdate;
