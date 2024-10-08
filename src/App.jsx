/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Component/Home.jsx';
import UserLogin from './Screens/Login/UserLogin.jsx';
import Registration from './Screens/Registration/Registration.jsx';

import AddJob from './Component/Job/AddJob.jsx';
import LatestJob from './Component/Job/LatestJob.jsx';
import JobDetails from './Component/Job/JobDetails.jsx';
import ProfileUpdate from '../src/Screens/ProfileUpdate.jsx';
import ShowProfile from './Screens/ShowProfile.jsx';
import SplashScreen from './Component/SplashScreen.jsx';
import ShowApplyJob from './Screens/ShowApplyJob.jsx';
import ShowAppliedjob from './Screens/ShowAppliedjob.jsx';




const SplashScreenWithRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return <SplashScreen />;
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SplashScreenWithRedirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createJob" element={<AddJob />} />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
        <Route path="/showprofile" element={<ShowProfile />} />
        <Route path="/jobdetails" element={<LatestJob />} />
       
        <Route path="/showjobApply" element={<ShowApplyJob />} />
        <Route path='/userlogin' element={<UserLogin />} />
        <Route path='/jobsdetails' element={<JobDetails />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/showappliedjob" element={<ShowAppliedjob />} />
      </Routes>
     
      
    </Router>
  );
}

export default App;
