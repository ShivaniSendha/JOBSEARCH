/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */



const Signup = require('../Modules/User');

const profileupdate= async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phoneNo, address, gender, language, dob, facebook, twitter } = req.body;

  try {
  
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

const UserDelete = async (req, res) => {
 
  try {
console.log('====================================');
console.log('req.params', req.params?.id);
console.log('====================================');
    const user = await Signup.findOne({_id: req.params.id}); // Use findById() for 
    
    console.log('====================================');
    console.log('user',user);
    console.log('====================================');

    if (!user) return res.status(404).json({ error: "User not found" });
    await user.deleteOne(); // Remove the user
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { profileupdate, UserDelete};