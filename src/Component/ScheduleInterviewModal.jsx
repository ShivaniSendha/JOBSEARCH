import React, { useState } from 'react';

const ScheduleInterviewModal = ({ userApplication, jobId, onClose }) => {
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate that necessary fields are available
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
          jobId: jobId,  
          date: interviewDate,
          time: interviewTime,
        }),
      });

      if (response.ok) {
        alert('Interview scheduled successfully');
        onClose();
      } else {
        alert('Failed to schedule interview');
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
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
              <button type="submit" className="btn btn-primary">Schedule</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
