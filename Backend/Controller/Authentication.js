const jwt = require('jsonwebtoken');
const Signup = require('../Modules/User');


const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRAET_KEY); 
    req.user = await Signup.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
