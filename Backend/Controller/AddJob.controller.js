/* eslint-disable no-undef */
const AddJob = require('../Modules/AddJob.js');

const AddNewJob = async (req, res) => {
  try {

    const job = await AddJob.create(req.body);
   
    res.status(201).json({ message: "New Job Created...", job });
  } catch (err) {
    console.error('Error during Job Creation:', err);
    res.status(400).json({
      message: 'Job creation failed, please try again.',
      error: err.message
    });
  }

}
// ===========Get
const GetAllJOb = async (req, res) => {
  try {

    const job = await AddJob.find(req.body);
    console.log('====================================');
    console.log('222222',job);
    console.log('====================================');
    return res.status(201).json({ message: "Get All Data...", job });
  } catch (err) {
    console.error('Error during Job Creation:', err);
    return res.status(400).json({
      message: ' failed, please try again.',
      error: err.message
    });
  }
}

  module.exports = { AddNewJob, GetAllJOb };
