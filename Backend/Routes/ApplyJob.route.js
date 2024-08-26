/* eslint-disable no-undef */
const ApplyJOb = require("../Controller/JobApply.controller");
const express = require('express');
const router = express.Router();
router.patch('/api/jobs/apply', ApplyJOb)
module.exports=router