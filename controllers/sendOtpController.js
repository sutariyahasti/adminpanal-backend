const otpGenerator = require("otp-generator");
const User = require("../models/User");
const OTP = require("../models/Otp");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

   // Check if user is already present
    const checkUserPresent = await User.findOne({ email });
    // If user found with provided email
    // if (checkUserPresent) {
    //   console.log("user exist");
    //   return res.status(401).json({
    //     success: false,
    //     message: "User is already registered",
    //   });
    // }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
      otpBody,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

