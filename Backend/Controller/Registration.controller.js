

const Signup = require('../Modules/User'); 
const bcrypt = require('bcryptjs');

const Registration = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const existingUser = await Signup.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = await Signup.create({
      ...req.body,
      password: hashedPassword
    });

    console.log('User Created:', user);
    return res.status(201).json({ user });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server Error' });
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
    const user = await Signup.findById(req.params.ID); 
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const GetUsersUpdate = async (req, res) => {
  try {
    const user = await Signup.findById(req.params.ID);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update(req.body); // Update the user
    return res.status(200).json({ message: "User updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};




module.exports = {
  Registration,
  GetUsers,
  GetUsersId,
  GetUsersUpdate,

};
