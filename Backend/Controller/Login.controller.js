const jwt = require('jsonwebtoken');
const config=require('dotenv')
const Signup = require('../Modules/User');
const bcrypt=require('bcryptjs')
const Login = async (req, res) => {
  config.config();
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRAET_KEY, { expiresIn: '30d' });

    res.status(200).json({
      message: 'Login successful',
      token, 
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


module.exports = Login;
