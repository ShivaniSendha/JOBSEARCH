const express = require('express');
const InterviewSchedule = require('../Controller/InterviewSchedule.controller');
const router = express.Router();
router.post('/scheduleInterview',InterviewSchedule)
module.exports = router;