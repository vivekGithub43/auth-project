const express = require('express');
const { signUp ,signin,signout, sendVerificationCode, verifyVerificationCode, changePassword, verifyForgotPasswordCode, sendForgotPasswordCode} = require('../controllers/authController');
const { identifier } = require('../middlewares/identification');

const router = express.Router();

router.post('/signUp',signUp);
router.post('/signin',signin);
router.post('/signout',identifier,signout);
router.patch('/send-verification-code',identifier,sendVerificationCode);
router.patch('/verify-verification-code',identifier,verifyVerificationCode);
router.patch('/change-password',identifier,changePassword);
router.patch('/send-forgot-password-code',sendForgotPasswordCode);
router.patch('/verify-forgot-password-code',verifyForgotPasswordCode)
module.exports=router;