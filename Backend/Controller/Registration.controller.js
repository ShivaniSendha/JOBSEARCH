/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const Signup = require('../Modules/User'); // Ensure this model is compatible with your ORM/ODM

const Registration = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const existingUser = await Signup.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    // Hash the password before saving the user
    const saltRounds = 10; // Number of salt rounds for hashing
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create new user with hashed password
    const user = await Signup.create({
      ...req.body,
      password: hashedPassword // Store the hashed password
    });

    return res.status(201).json(user);
    
  } catch (err) {
    console.error('Registration Failed:', err.message);
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
