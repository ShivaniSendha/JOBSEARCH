/* eslint-disable no-undef */
const Signup = require("../Modules/User.js");

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  Signup.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.status(200).json({ message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email }
          });
        }
        else {
          res.status(401).json({ message: 'Password incorrect', });
          
        }
      }
      else {
        return res.status(401).json({ message: 'User Not Found' });
      }
    })
};
module.exports = Login;