const express = require('express');
const router = express.Router();

const Signup = require('../Modules/User');

// PUT route example
const profileupdate= async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phoneNo, address, gender, language, dob, facebook, twitter } = req.body;

  try {
    // Find and update the user by ID
    const updatedUser = await Signup.findByIdAndUpdate(id, {
      name,
      email,
      password,
      phoneNo,
      address,
      gender,
      language,
      dob,
      facebook,
      twitter
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
}
// +++++++++++++++++++delete

module.exports = profileupdate;
