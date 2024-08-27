/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Signup = require("../Modules/User.js"); // Ensure this model is compatible with your ORM/ODM

const Registration = async (req, res) => {
  try {
    // Log the request body for debugging
    console.log("Request Body:", req.body);

    // Check if a user with the given email already exists
    const existingUser = await Signup.findOne({ email: req.body.email });
    if (existingUser) {
      // If the user already exists, return a 400 status with an error message
      return res.status(400).json({ message: 'User Already Exists' });
    }

    // If the user doesn't exist, create a new user
    const user = await Signup.create(req.body);

    // Return the created user with a 201 status
    return res.status(201).json(user);
  } catch (err) {
    // Catch any errors during the process and return a 400 status with an error message
    res.status(400).json({ message: 'Registration Failed', error: err.message });
  }
};


const GetUsers = async (req, res) => {
  try {
   
    const users = await Signup.find(); 
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const GetUsersId = async (req, res) => {
  try {
    const user = await Signup.findById(req.params.ID); // Use findById() for MongoDB
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const GetUsersUpdate = async (req, res) => {
  try {
    const user = await Signup.findById(req.params.ID); // Use findById() for MongoDB
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update(req.body); // Update the user
    return res.status(200).json({ message: "User updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// const GetUsersDelete = async (req, res) => {
//   try {
//     const user = await Signup.findById(req.params.ID); // Use findById() for MongoDB
//     if (!user) return res.status(404).json({ error: "User not found" });
//     await user.deleteOne(); // Remove the user
//     return res.status(200).json({ message: "User deleted" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// Export the functions
module.exports = {
  Registration,
  GetUsers,
  GetUsersId,
  GetUsersUpdate,

};
