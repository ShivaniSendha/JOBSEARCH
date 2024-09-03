import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../Job/JobUpdateModal.css'
const JobUpdateModal = ({ show, handleClose, jobData, onUpdate }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    category: '',
    location: '',
    description: '',
    salaryRange: '',
    vacancies: '',
    experience: '',
    jobType: '',
    qualification: '',
    skills: '',
    email: '',
    phoneNo: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (jobData) {
      setFormData({
        companyName: jobData.companyName || '',
        category: jobData.category || '',
        location: jobData.location || '',
        description: jobData.description || '',
        salaryRange: jobData.salaryRange || '',
        vacancies: jobData.vacancies || '',
        experience: jobData.experience || '',
        jobType: jobData.jobType || '',
        qualification: jobData.qualification || '',
        skills: jobData.skills || '',
        email: jobData.email || '',
        phoneNo: jobData.phoneNo || '',
        address: jobData.address || '',
        city: jobData.city || '',
        state: jobData.state || '',
        country: jobData.country || '',
        zipCode: jobData.zipCode || ''
      });
    }
  }, [jobData]);

  const handleChange = (e) => {
    setFormData({ ...formData,
       [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company Name is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.location) newErrors.location = 'Location is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.salaryRange) newErrors.salaryRange = 'Salary Range is required.';
    if (!formData.vacancies) newErrors.vacancies = 'Vacancies are required.';
    if (!formData.experience) newErrors.experience = 'Experience is required.';
    if (!formData.jobType) newErrors.jobType = 'Job Type is required.';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required.';
    if (!formData.skills) newErrors.skills = 'Skills are required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.phoneNo) newErrors.phoneNo = 'Phone Number is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.state) newErrors.state = 'State is required.';
    if (!formData.country) newErrors.country = 'Country is required.';
    if (!formData.zipCode) newErrors.zipCode = 'Zip Code is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.patch(`http://localhost:8000/Addnewjob/updatejob/${jobData._id}`, formData)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Job Update',
            text: 'The job has been updated successfully.',
          });
          onUpdate();
          handleClose();
          navigate('/home');
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'An error occurred while updating the job.',
          });
        });
    }
  };

  return (
    <Modal  show={show} onHide={handleClose}>
      <Modal.Header className='UpdateModal' closeButton>
        <Modal.Title>Update Job</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder='Please Enter Company Name'
              isInvalid={!!errors.companyName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.companyName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
            >
              <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              {/* Add more categories as needed */}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder='Please Enter Location'
              isInvalid={!!errors.location}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='Please Enter Description'
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary Range</Form.Label>
            <Form.Control
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange= {handleChange}
              placeholder='Please Enter Salary Range'
              isInvalid={!!errors.salaryRange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.salaryRange}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vacancies</Form.Label>
            <Form.Control
              type="number"
              name="vacancies"
              value={formData.vacancies}
              onChange={handleChange}
              placeholder='Please Enter Number of Vacancies'
              isInvalid={!!errors.vacancies}
            />
            <Form.Control.Feedback type="invalid">
              {errors.vacancies}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder='Please Enter Required Experience'
              isInvalid={!!errors.experience}
            />
            <Form.Control.Feedback type="invalid">
              {errors.experience}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job Type</Form.Label>
            <Form.Control
              type="text"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              placeholder='Please Enter Job Type'
              isInvalid={!!errors.jobType}
            />
            <Form.Control.Feedback type="invalid">
              {errors.jobType}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Qualification</Form.Label>
            <Form.Control
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder='Please Enter Qualification'
              isInvalid={!!errors.qualification}
            />
            <Form.Control.Feedback type="invalid">
              {errors.qualification}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              as="select"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              isInvalid={!!errors.skills}
            >
              <option value="">Select Skills</option>
              <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
              <option value="SEO Specialist">SEO Specialist</option>
              <option value="Content Marketing Strategist">Content Marketing Strategist</option>
              <option value="Social Media Manager">Social Media Manager</option>
              <option value="PPC Specialist">PPC Specialist</option>
              <option value="Email Marketing Specialist">Email Marketing Specialist</option>
              <option value="Salesforce Administrator">Salesforce Administrator</option>
              <option value="Account Manager">Account Manager</option>
              <option value="Business Development Executive">Business Development Executive</option>
              <option value="Sales Executive">Sales Executive</option>
              <option value="Customer Success Manager">Customer Success Manager</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Mobile App Developer">Mobile App Developer</option>
              <option value="Python Developer">Python Developer</option>
              <option value="Java Developer">Java Developer</option>
              <option value="PHP Developer">PHP Developer</option>
              <option value="WordPress Developer">WordPress Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Cloud Engineer">Cloud Engineer</option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.skills}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Please Enter Email'
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder='Please Enter Phone Number'
              isInvalid={!!errors.phoneNo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNo}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder='Please Enter Address'
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              name="city"
              value={formData.city}
              onChange={handleChange}
              isInvalid={!!errors.city}
            >
              <option value="">Select City</option>
              <option value="Indore">Indore</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Surat">Surat</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Kanpur">Kanpur</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Kochi">Kochi</option>
              <option value="Patna">Patna</option>
              <option value="Ludhiana">Ludhiana</option>
              <option value="Nashik">Nashik</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              value={formData.state}
              onChange={handleChange}
              isInvalid={!!errors.state}
            >
              <option value="">Select State</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="RJ">Rajasthan</option>
              <option value="GJ">Gujarat</option>
              <option value="KA">Karnataka</option>
              <option value="TN">Tamil Nadu</option>
              <option value="WB">West Bengal</option>
              <option value="PB">Punjab</option>
              <option value="HR">Haryana</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              name="country"
              value={formData.country}
              onChange={handleChange}
              isInvalid={!!errors.country}
            >
              <option value="">Select Country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="UK">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="BR">Brazil</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder='Please Enter Zip Code'
              isInvalid={!!errors.zipCode}
            />
            <Form.Control.Feedback type="invalid">
              {errors.zipCode}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className='UpdateModal' variant="primary" type="submit">
            Update Job
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default JobUpdateModal;