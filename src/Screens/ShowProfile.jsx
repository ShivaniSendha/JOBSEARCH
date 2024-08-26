/* eslint-disable no-unused-vars */
import React from 'react';
import '../Screens/ShowProfile.css';
import Navbar from '../Component/Navbar/Navbar';

const ShowProfile = () => {
  const UserData = JSON.parse(localStorage.getItem('user'));
  console.log('UserData1:', UserData?.phoneNo);

  return (
    <>
    <Navbar/>
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <ul className="profile-list">
        <li><strong>Name:</strong> {UserData?.name || 'N/A'}</li>
        <li><strong>Email:</strong> {UserData?.email || 'N/A'}</li>
        <li><strong>Phone Number:</strong> {UserData?.phoneNo || 'N/A'}</li>
        <li><strong>Address:</strong> {UserData?.address || 'N/A'}</li>
        <li><strong>Gender:</strong> {UserData?.gender || 'N/A'}</li>
        <li><strong>Language:</strong> {UserData?.language || 'N/A'}</li>
        <li><strong>Date of Birth:</strong> {UserData?.dob || 'N/A'}</li>
        <li><strong>Facebook:</strong> <a href={UserData?.facebook} target="_blank" rel="noopener noreferrer">{UserData?.facebook || 'N/A'}</a></li>
        <li><strong>Twitter:</strong> <a href={UserData?.twitter} target="_blank" rel="noopener noreferrer">{UserData?.twitter || 'N/A'}</a></li>
      </ul>
      </div>
      </>
  );
}

export default ShowProfile;
