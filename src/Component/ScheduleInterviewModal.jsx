import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ScheduleInterviewModal = ({ userApplication, jobId, onClose }) => {
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userApplication || !jobId) {
      alert('Missing required information for scheduling the interview.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/interview/scheduleInterview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userApplication.userId._id,
          jobId,
          date: interviewDate,
          time: interviewTime,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Interview Scheduled',
          text: 'The interview has been successfully scheduled, and an email has been sent to the user.',
        });
        onClose(); // Close the modal
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Schedule',
          text: 'There was an issue scheduling the interview. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while scheduling the interview.',
      });
    }
  };

  return (
    <div className="modal " style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header UpdateModal">
            <h5 className="modal-title">Schedule Interview</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="interviewDate" className="form-label">Date</label>
                <input
                  type="date"
                  id="interviewDate"
                  className="form-control"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="interviewTime" className="form-label">Time</label>
                <input
                  type="time"
                  id="interviewTime"
                  className="form-control"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary UpdateModal">Schedule</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
