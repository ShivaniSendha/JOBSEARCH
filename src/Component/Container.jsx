import React from 'react'
import Navbar from '../Navbar/Navbar'
import logo from '../../assets/logoReg.avif';
import { useNavigate } from 'react-router-dom';
const JobDetails = () => {
  const navigate = useNavigate();
  const HomeClick = () => {
    navigate('/home')
  }
  return (
    <>

      <div className="hero-container">
        <img src={logo} className="hero-image" alt="img" />
        <div className="hero-text">
          <h1>Login</h1>
          <div className='flex align-items-center m-3'>
            <span onClick={HomeClick} className="Home btn btn-outline-success ">Home</span> <span className="">&gt;&gt; Login </span>
          </div>
        </div>
      </div>

    </>
  )
}

export default JobDetails