import React from 'react';
import { FaDownload } from 'react-icons/fa';

const DownloadResume = ({ resumeUrl, filename }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(resumeUrl); // Fetch the resume file
      const blob = await response.blob(); // Convert response to Blob
      const url = URL.createObjectURL(blob); // Create a URL for the Blob

      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'resume.pdf'; // Optional: Set the filename
      link.click();

      // Clean up the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div>
      <button
        className='btn  btn-outline-success border border-1 p-2 rounded rounded-3 d-flex align-items-center'
        onClick={handleDownload}
      >
        <FaDownload className='me-2 ' /> {/* Icon with margin-end */}
        Download Resume
      </button>
    </div>
  );
};

export default DownloadResume;
