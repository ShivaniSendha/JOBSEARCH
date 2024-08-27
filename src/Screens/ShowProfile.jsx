/* eslint-disable no-unused-vars */
import React from 'react';
import '../Screens/ShowProfile.css';
import Navbar from '../Component/Navbar/Navbar';
import { IoIosContact } from 'react-icons/io';

const ShowProfile = () => {
  const UserData = JSON.parse(localStorage.getItem('user'));
  console.log('UserData1:', UserData?.phoneNo);
  const username = UserData?.name || UserData?.user?.name;
  const userEmail = UserData?.email || UserData?.user?.email;
  const usernphone = UserData?.phoneNo || UserData?.user?.phoneNo;
  
  const useraddress = UserData?.address || UserData?.user?.address;
  const usergender = UserData?.gender || UserData?.user?.gender;
  const userlanguage = UserData?.language || UserData?.user?.language;
  const userdob = UserData?.dob || UserData?.user?.dob;
  const userfacebook = UserData?.facebook || UserData?.user?.facebook;
  const usertwitter = UserData?.twitter || UserData?.user?.twitter;
  return (
    <>
      <Navbar />
     <div className='contacticn'>
      <div className="profile-container  ">
      <IoIosContact size={200} color='blue' className='img-fluid rounded-circle mb-3    ' />
      <h2 className="profile-title">User Profile</h2>
        <ul className="profile-list">
          {

            UserData && UserData ?
            
        <>
        <li><strong>Name:</strong> {username || 'N/A'}</li>
                  <li><strong>Email:</strong> {userEmail || 'N/A'}</li>
                       
        <li><strong>Address:</strong> {useraddress || 'N/A'}</li>
        <li><strong>Gender:</strong> {usergender || 'N/A'}</li>
        <li><strong>Language:</strong> {userlanguage || 'N/A'}</li>
        <li><strong>Date of Birth:</strong> {userdob || 'N/A'}</li>
        <li><strong>Facebook:</strong>  {userfacebook} </li>
                <li><strong>Twitter:</strong> {usertwitter} </li>
              </> :
              <>
                <li><strong>Name:</strong> {usernphone|| 'N/A'}</li>
                <li><strong>Email:</strong> {useraddress || 'N/A'}</li>
        
         
                </>
          }
      </ul>
        </div>
        </div>
      </>
  );
}

export default ShowProfile;
