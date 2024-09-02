const OTP = require("../models/Otp");
const User = require("../models/User");

// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(499).json({ error: 'All fields are required' });
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(403).json({ error: 'Invalid email format' });
//   }

//   if (password.length < 6) {
//     return res.status(403).json({ error: 'Password must be at least 6 characters long' });
//   }

//   try {
//     // Check if the email already exists in the database
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: 'Email already exists' });
//     }

//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User created successfully', user });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ error: error.message });
//     }
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName,otp } = req.body;

    // Check if all details are provided
    if ( !email || !password || !otp) {
      return res.status(499).json({
        success: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(403).json({  success: false, error: 'Invalid email format' });
      }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(401).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      lastLogin: new Date(),
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
