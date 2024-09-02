const express = require('express');
const { loginUser } = require('../controllers/authController');
const { registerUser } = require('../controllers/RegisterController');
const { sendOTP } = require('../controllers/sendOtpController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post("/send-otp", sendOTP);


module.exports = router;
