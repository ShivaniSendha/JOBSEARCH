/* eslint-disable no-undef */
const express = require('express');
const { AddNewJob, GetAllJOb } = require('../Controller/AddJob.controller.js');
const upload = require('../Controller/upload.js');
const router = express.Router();
// router.post('/',upload.single('Companylogo'), AddNewJob);
// router.patch('/:jobId/status', updateJobDetails);


router.get('/getAlljob', GetAllJOb);

module.exports = router;