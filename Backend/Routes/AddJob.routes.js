/* eslint-disable no-undef */
const express = require('express');
const router=express.Router()
const { AddNewJob, GetAllJOb } = require('../Controller/AddJob.controller.js');
router.post('/', AddNewJob);

router.get('/getAlljob', GetAllJOb);

module.exports = router;