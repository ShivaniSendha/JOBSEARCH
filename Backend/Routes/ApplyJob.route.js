/* eslint-disable no-undef */
const ApplyJOb = require("../Controller/JobApply.controller.js");
const express = require('express');
const router = express.Router();
router.patch('/api/jobs/apply', ApplyJOb.ApplyJOb)
router.post('/api/jobs/getJobApplied',ApplyJOb.getJobAppliedSatus)
router.get('/api/jobs/applied/:userId', ApplyJOb.GetJobApply)

module.exports=router