import React, { useState, useEffect } from 'react';
import logo from '../../assets/JobLogo1.png';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import '../Navbar/Navbar.css';
import { IoIosContact } from "react-icons/io";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  
  }, []);

  const userName = userData?.name || userData?.user?.name;
  const userEmail = userData?.email || userData?.user?.email;

  const handleSweetAlertLogout = () => {
    Swal.fire('Success!', 'Logout Successfully Done', 'success');
  }

  const handleClickProfileUpdate = () => {
    navigate('/profileupdate');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/userlogin');
  };

  const handleClickHome = () => {
    navigate('/home');
    setActiveItem('home');
  };
  const handleClickShowAppliedJob = () => {
  navigate('/showappliedjob')
}
  const handleClickShowJob = () => {

    navigate('/home');
    setActiveItem('jobdetails');

    setTimeout(() => {
      const section = document.getElementById('top-jobs');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleClickCreateJob = () => {
    navigate('/createJob');
    setActiveItem('addJob');
  };

  const handleClickLogin = () => {
    navigate('/userlogin');
    setActiveItem('login');
  };

  const handleClickSignUp = () => {
    navigate('/registration');
    setActiveItem('registration');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm p-3 ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
      <div className="container-fluid">
      <img src={logo} alt="" style={{width:'90px',height:'60px',}} />
        <button
          className="navbar-toggler"
          type="button "
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent "
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='main'>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-end">
              <li className="nav-item">
                <button className={`btn btn-outline-success ms-2 ${activeItem === 'home' ? 'active' : ''}`} type="button" onClick={handleClickHome}>
                  Home
                </button>
              </li>

              <li className="nav-item dropdown">
                <button className={`btn btn-outline-success dropdown-toggle ms-2 ${activeItem === 'addJob' || activeItem === 'jobdetails' ? 'active' : ''}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Job
                </button>


                <ul className="dropdown-menu">
                  {userEmail === 'admin@gmail.com' ?
                    (
                      <>
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
                            href="#"
                            onClick={handleClickShowJob}
                          >
                            Show Job
                          </a>
                        </li>
                        <li>
                          <a
                            className={`dropdown-item ${activeItem === 'jobdetails' ? 'active' : ''}`}
                            href="#"
                            onClick={handleClickShowAppliedJob}
                          >
                            Applied Job
                          </a>
                        </li>
                      </>
                    ) : (
                      <>

                        <li>
                          <a
                            className={`dropdown-item ${activeItem === 'jobdetails' ? 'active' : ''}`}
                            href="#"
                            onClick={handleClickShowJob}
                          >
                            Show Job
                          </a>
                        </li>
                        
                      </>
                    )
                  }
                </ul>



              </li>
            </ul>
            {userData ? (
              <div className="dropdownP ms-3">
                <button className="btn btn-primary profile" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userName ? userName[0].toUpperCase() : 'U'}
                </button>
                <ul className="dropdown-menuP">
                  <div className='Profilelogo'>
                    <IoIosContact size={80} color='blue' className='Profilelogo1' />
                    <p className='fw-bold'>{userName ? userName.toUpperCase() : 'U'}</p>
                  </div>
                  <li>
                    <a
                      className="dropdown-itemP"
                      href="#"
                      onClick={() => {
                        handleLogout();
                        handleSweetAlertLogout();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-itemP ${activeItem === 'jobdetails' ? 'active' : ''}`}
                      href="#"
                      onClick={handleClickProfileUpdate}
                    >
                      Update Profile
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <button className={`btn btn-outline-success ms-2 ${activeItem === 'login' ? 'active' : ''}`} type="button" onClick={handleClickLogin}>
                  Login <IoIosContact size={20} color='white' />
                </button>
                <button className={`btn btn-outline-success ms-2 ${activeItem === 'registration' ? 'active' : ''}`} type="button"
                  onClick={handleClickSignUp}>
                  Sign-up <FaLongArrowAltRight />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
