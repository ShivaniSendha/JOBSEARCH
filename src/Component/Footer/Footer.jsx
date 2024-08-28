/* eslint-disable no-unused-vars */
import React from 'react';
import '../Footer/Footer.css'; // Optional: if you have additional custom styles
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer id='footers' className="text-dark pt-4  ">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h2 className="text-success  fs-4">About Us</h2>
            <p>Lorem Ipsum is simply dummy text of printing and type setting industry. Lorem Ipsum been industry standard dummy text ever since.</p>
            <div className="social-icons d-flex justify-content-center gap-4">
              <FaFacebook className="icon" size={30} />
              <FaGoogle className="icon" size={30} />
              <FaTwitter className="icon" size={30} />
              <FaInstagram className="icon" size={30} />
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <h3 className="text-success fs-4">Job Categories</h3>
            <ul className="list-styled footer">
              <li> Work from Home</li>
              <li>Internship Job</li>
              <li>Freelancer Job</li>
              <li>Part Time Job</li>
              <li>Full Time Job</li>
            </ul>
          </div>
          <div className="col-md-2 mb-3">
            <h3 className="text-success  fs-4">Job Type</h3>
            <ul className="list-styled footer">
              <li>Create Account</li>
              <li>Career Counseling</li>
              <li>My Oficiona</li>
              <li>FAQ</li>
              <li>Report a Problem</li>
            </ul>
          </div>
          <div className="col-md-2 mb-3">
            <h3 className="text-success  fs-4">Resources</h3>
            <ul className="list-styled footer">
              <li>My Account</li>
              <li>Support</li>
              <li>How It Works</li>
              <li>Underwriting</li>
              <li>Employers</li>
            </ul>
          </div>
          <div className="col-md-2 mb-3">
            <h3 className="text-success  fs-4">Quick Links</h3>
            <ul className="list-styled footer">
              <li>Jobs Listing</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Term & Condition</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom bg-success text-light  text-center">
          <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer >
  );
}

export default Footer;
