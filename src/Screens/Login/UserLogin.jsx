/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar/Navbar.jsx';
import logo from '../../assets/carousel3.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../Component/Footer/Footer.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Login/UserLogin.css'
const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const tglPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const HomeClick = () => {
    navigate('/');
  };

  const handleClose = () => {
    navigate('/');
  };

  const collectData = async (e) => {
    e.preventDefault();

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith('@gmail.com');
    };

    const validatePassword = (password) => {
      return /^\d{5,}$/.test(password);
    };

    if (!email) {
      toast.error('Email is required');
      return false;
    }
    if (!password) {
      toast.error('Password is required');
      return false;
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
      const response = await fetch('http://localhost:8000/UserLogin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseText = await response.text();
      console.log('Server Response:', responseText);

      if (response.ok) {
        const result = JSON.parse(responseText);
        localStorage.setItem('user', JSON.stringify(result));
        toast.success('Login Successful');
        navigate('/');
      } else {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.log('Login error:', error);
      toast.error(error.message || 'User Not Found. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero-container1">
        <img src={logo} className="hero-image1" alt="img" />
        <div className="hero-text1">
          <h1>Login</h1>
          <span onClick={HomeClick} className="Home1">Home</span> <span>&gt;&gt; Login </span>
        </div>
      </div>
      <form onSubmit={collectData} className="container mt-5 mb-5 col-4">
        <div className="p-5 border border-2 ">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
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
          <button type="submit" className="btn btn-success w-100">Login</button>
        </div>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default UserLogin;
