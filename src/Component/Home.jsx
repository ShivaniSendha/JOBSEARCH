/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

import logo from '../assets/logoReg.avif';
import '../Component/Home.css'
import Navbar from './Navbar/Navbar';
import SearchInput from './SearchInput';
import LatestJob from './Job/LatestJob';
import Footer from '../Component/Footer/Footer';


const Home = () => {





  return (
    <>
      <Navbar />
    
      <img className='img1 ' src={logo} 
     alt="Your Image Description"></img>    

      <div className="hero-text flex rounded rounded-5 " style={{ top: '35%' }}>
        <h1 className='heading'>Search , Apply & <br></br> Get Your <span className='text-primary'>Dreams Jobs</span></h1>
        <SearchInput />

      </div>


      <LatestJob />
      <Footer />


    </>
  );
};

export default Home;