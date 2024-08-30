

const Signup = require('../Modules/User');

const bcrypt = require('bcrypt');

// ++++++++++++UpdateProfile
const profileupdate = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phoneNo, address, gender, language, dob, facebook, twitter } = req.body;

  try {
 
    const updateFields = { 
      name,
      email,
      phoneNo,
      address,
      gender,
      language,
      dob,
      facebook,
      twitter
    };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await Signup.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};


// +++++++++++++++++++deleteProfile

const UserDelete = async (req, res) => {
 
  try {
console.log('====================================');
console.log('req.params', req.params?.id);
console.log('====================================');
    const user = await Signup.findOne({_id: req.params.id});
    
    console.log('====================================');
    console.log('user',user);
    console.log('====================================');

    if (!user) return res.status(404).json({ error: "User not found" });
    await user.deleteOne(); 
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { profileupdate, UserDelete};