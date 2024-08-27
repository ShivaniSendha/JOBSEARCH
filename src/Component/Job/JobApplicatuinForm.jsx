// src/components/JobApplicationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    jobId: '',
    userId: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('jobId', formData.jobId);
    formDataToSend.append('userId', formData.userId);
    formDataToSend.append('resume', formData.resume);

    try {
      const response = await axios.post('/api/apply-job', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message || 'Application submitted');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job ID:
        <input
          type="text"
          name="jobId"
          value={formData.jobId}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        User ID:
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Resume:
        <input
          type="file"
          name="resume"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Apply</button>
    </form>
  );
};

export default JobApplicationForm;
