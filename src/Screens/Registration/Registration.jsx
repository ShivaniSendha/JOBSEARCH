/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Component/Navbar/Navbar';
import logo from '../../assets/logoReg.avif';
import './../Registration/Registration.css'; // Import the CSS file for styling
import Footer from '../../Component/Footer/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Registration = () => {
  const handleSweetAlertSIgnup = () => {
    Swal.fire('Success!', 'Sign Up Successfully Done', 'success')
  }
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const tglPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const HomeClick = () => {
    navigate('/')
  }
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith('@gmail.com');
  };

  const validatePassword = (password) => {
    return /^\d{5,}$/.test(password);
  };
  

  const collectData = async (e) => {
    e.preventDefault();
  
    toast.dismiss();
  
    if (!name) {
      toast.error('Please enter your name.');
      return;
    }
  
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }
  
    if (!password) {
      toast.error('Please enter your password.');
      return;
    }
  
    if (!validateEmail(email)) {
      toast.error('Please enter a valid Gmail address.');
      return;
    }
  
    if (!validatePassword(password)) {
      toast.error('Password must be at least 5 digits long and contain only digits.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/UserRegistration', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.error || 'Registration failed. Please try again.');
        }
  
        localStorage.setItem('users', JSON.stringify(result));
        navigate('/userlogin');
        handleSweetAlertSIgnup();
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error(`Registration failed: ${error.message}`);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="hero-container">
        <img src={logo} className="hero-image" alt="img" />
        <div className="hero-text">
          <h1>Create an Account</h1>
          <div className='flex align-items-center m-3'>
            <span onClick={HomeClick} className="Home btn btn-outline-success ">Home</span> <span className="">&gt;&gt; Sign Up </span>
          </div>
        </div>
      </div>
      <form onSubmit={collectData} className="container mt-5 mb-5 col-4">
        <div className='p-5 border border-2 rounded'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder='Please Enter UserName'
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder='Please Enter Email'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="password" className="form-label">Password</label>
            <div className='show'>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Please Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='tgl' onClick={tglPasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </div>
      </form>
      <ToastContainer />
   
    </>
  );
};

export default Registration;
