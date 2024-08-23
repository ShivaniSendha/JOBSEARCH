/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import logo from '../../assets/softude.png';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import '../Navbar/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleClickHome = () => {
    navigate('/');
    setActiveItem('home');
    
  };
  const handlClickShowjob = () => {
   
    navigate('/#top-jobs'); 
    setActiveItem('jobdetails');
    
    
    setTimeout(() => {
      const section = document.getElementById('top-jobs');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };
  
  const handleClick = () => {
    navigate('/registration');
    setActiveItem('registration');
  };

  const handleClickLogin = () => {
    navigate('/userlogin');
    setActiveItem('login'); 
  };

  const handleClickCreateJob = () => {
    navigate('/createJob');
    setActiveItem('addJob');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm p-3  ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
      <div className="container-fluid">
        <img className="navbar-brand" src={logo} alt="Logo" style={{ width: '10%', height: '50px', borderRadius: '5px' }} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-end">
            <li className="nav-item">
              <button className={`btn btn-outline-success ms-2 ${activeItem === 'home' ? 'active' : ''}`} type="submit" onClick={handleClickHome}>
                Home
              </button>
            </li>
            <div className="dropdown">
              <li className="nav-item">
                <button className={`btn btn-outline-success dropdown-toggle ms-2 ${activeItem === 'addJob' ? 'active' : ''}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Job
                </button>
              </li>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className={`dropdown-item ${activeItem === 'addJob' ? 'active' : ''}`}
                    href="#"
                    onClick={handleClickCreateJob}
                  >
                    Add Job
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${activeItem === 'jobdetails' ? 'active' : ''}`}
                    onClick={handlClickShowjob}
                  >
                   Show Job 
                  </a>
                </li>
              </ul>
            </div>
          </ul>
          <button className={`btn btn-outline-success ms-2 ${activeItem === 'login' ? 'active' : ''}`} type="submit" onClick={handleClickLogin}>
            Login <FaLongArrowAltRight />
          </button>
          <button className={`btn btn-outline-success ms-2 ${activeItem === 'registration' ? 'active' : ''}`} type="submit" onClick={handleClick}>
            Sign-up <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
