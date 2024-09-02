const { generateToken } = require("../config/jwtConfig");
const User = require("../models/User");


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(499).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
