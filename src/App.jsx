/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Component/Home.jsx';
import UserLogin from './Screens/Login/UserLogin.jsx';
import Registration from './Screens/Registration/Registration.jsx';
import Navbar from './Component/Navbar/Navbar.jsx';
import Footer from './Component/Footer/Footer.jsx';
import AddJob from './Component/Job/AddJob.jsx';
import LatestJob from './Component/Job/LatestJob.jsx';
import JobDetails from './Component/Job/JobDetails.jsx';

import { AuthProvider } from './Component/Context/AuthContext.jsx'; // Import AuthProvider

import ProfileUpdate from './Screens/ProfileUpdate.jsx';
import ShowProfile from './Screens/ShowProfile.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
         {/* Navbar should be outside Routes if you want it visible on every page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createJob" element={<AddJob />} />
          <Route path="/profileupdate" element={<ProfileUpdate />} />
          <Route path="/showprofile" element={<ShowProfile />} />
          <Route path="/jobdetails" element={<LatestJob />} />
          <Route path='/userlogin' element={<UserLogin />} />
          <Route path='/jobsdetails' element={<JobDetails />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <Footer /> {/* Footer can be placed here if you want it on all pages */}
      </Router>
    </AuthProvider>
  );
}

export default App;
