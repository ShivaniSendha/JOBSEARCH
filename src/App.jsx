// eslint-disable-next-line no-unused-vars
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './Component/Home.jsx'
import UserLogin from './Screens/Login/UserLogin.jsx'
import Registration from './Screens/Registration/Registration.jsx';
import { ToastContainer } from 'react-toastify';
import Navbar from './Component/Navbar/Navbar.jsx';
import Footer from './Component/Footer/Footer.jsx';
import AddJob from './Component/Job/AddJob.jsx';
import LatestJob from './Component/Job/LatestJob.jsx';
import ShowJobs from './Component/Job/JobDetails.jsx';
import JobDetails from './Component/Job/JobDetails.jsx';




function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/createJob" element={<AddJob />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/jobdetails" element={<LatestJob />} />
        <Route path='/userlogin' element={<UserLogin />} />
        <Route path='/jobsdetails' element={<JobDetails />} />
    
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
