/* eslint-disable no-undef */
const ApplyJOb = require("../Controller/JobApply.controller.js");
const express = require('express');
const router = express.Router();
router.patch('/api/jobs/apply', ApplyJOb.ApplyJOb)

router.get('/api/jobs/getJobApplied',ApplyJOb.getJobAppliedSatus)
router.get('/api/jobs/applied/:userId', ApplyJOb.GetJobApply)
router.get("/api/jobs/find-user/:userId",ApplyJOb.findUserInJob)
module.exports=router