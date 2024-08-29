/* eslint-disable no-unused-vars */
import React from 'react';
import '../Screens/ShowProfile.css';
import Navbar from '../Component/Navbar/Navbar';
import { IoIosContact } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';

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
  const userProfile = UserData?.profilePic || UserData?.user?.profilePic;
  console.log('====================================');
  console.log("userProfile", userProfile);
  console.log('====================================');
  return (
    <>
      <Navbar />
      <div className='contacticn'>
        <div className="profile-container  ">
          {/* {userProfile ? (
          <img 
            src={`http://localhost:8000/uploads/${userProfile}`} 
            alt="User Profile"
            className="profile-picture"
          />
        ) : (
          <p>No profile picture available</p>
        )} */}
          <IoIosContact size={150} color='blue' className='img-fluid rounded-circle mb-3  ' />
      
       
          <ul className="profile-list">

            {username ? <li><strong>Name:</strong> {username}</li> : null}
            {userEmail ? <li><strong>Email:</strong> {userEmail}</li> : null}
            {usernphone ? <li><strong>Phone No:</strong> {usernphone}</li> : null}
            </ul>
        
            <div className='profile-container-sec'>
  <ul className="profile-list1">
{useraddress && <li><strong>Address:</strong> {useraddress}</li>}
    {usergender && <li><strong>Gender:</strong> {usergender}</li>}
    {userlanguage && <li><strong>Language:</strong> {userlanguage}</li>}
    {userdob && <li><strong>Date of Birth:</strong> {userdob}</li>}
    {userfacebook && <li><strong>Facebook:</strong> {userfacebook}</li>}
    {usertwitter && <li><strong>Twitter:</strong> {usertwitter}</li>}
  </ul>
</div>

</div>
       
   
      </div>
    </>
  );
}

export default ShowProfile;
