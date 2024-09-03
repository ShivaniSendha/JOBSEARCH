/* eslint-disable no-undef */
const express = require('express');
const router=express.Router()
const { AddNewJob, GetAllJOb, DeleteJob, UpdateJob } = require('../Controller/AddJob.controller.js');
router.post('/', AddNewJob);

router.get('/getAlljob', GetAllJOb);
router.delete('/deletejob/:id',DeleteJob)
router.patch('/updatejob/:id',UpdateJob)
module.exports = router;