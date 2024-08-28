const bcrypt = require('bcrypt');
const Signup = require('../Modules/User');

const Login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    
    const user = await Signup.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
  
    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = Login;
