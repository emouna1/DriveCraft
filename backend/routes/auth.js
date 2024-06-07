const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');
const loginController = require('../controllers/login');
const forgotPasswordController = require('../controllers/forgotpassword');
const changePasswordController = require('../controllers/changePassword')
const userE = require('../controllers/userController')


router.post('/signup', [
  check('username').not().isEmpty(),
  check('email').isEmail(),
  check('password').isLength({min: 6}),
  // Adjust validation rules for properties that can be null
  check('name').not().isEmpty(),
  check('firstName').optional().not().isEmpty(),
  check('CIN').not().isEmpty(),
  check('dateOfIssue').optional().isISO8601().toDate(),
  check('situation').not().isEmpty(),
  check('balance').optional().not().isEmpty(),
  check('dateOfBirth').isISO8601().toDate(),
  check('nationality').not().isEmpty(),
  check('address').not().isEmpty(),
  check('telephone').not().isEmpty(),
  check('personalCode').optional().not().isEmpty(),
  check('personnelFunction').optional().not().isEmpty(),
  check('recruitmentDate').optional().not().isEmpty(),
  check('netSalary').optional().not().isEmpty(),
  check('grossSalary').optional().not().isEmpty(),
  check('qualification').optional().not().isEmpty(),
  check('leaveDaysPerYear').optional().not().isEmpty(),
  check('cnssNumber').optional().not().isEmpty(),
  check('CategoryCode').optional().not().isEmpty()
], authController.signup);


// POST /auth/login
router.post('/login', [
  check('username').not().isEmpty(),
  check('password').isLength({min: 6})
], loginController.login);

// auth/logout
router.post('/logout', (req, res) => {
  // Since JWTs are stateless, there's no need to do anything here
  // Just send a success response indicating logout successful
  res.status(200).json({message: 'Logout successful'});
});

// auth/forgotpassword

//router.post('/forgotpassword', forgotPasswordController.requestPasswordReset);
router.post('/forgotpassword', [
  check('email').isEmail()
], forgotPasswordController.requestPasswordReset);

router.post('/resetpassword', [
  check('email').isEmail(),
  check('token').notEmpty(),
  check('newPassword').isLength({min: 6}) // Adjust validation as needed
], forgotPasswordController.resetPassword);



router.post('/changePassword', [
  check('email').isEmail(),
  check('oldPassword').notEmpty().withMessage('Old password is required'),
  check('newPassword').notEmpty().withMessage('New password is required'),

],changePasswordController.changePassword);



router.get('/enrollment/:cin',[] ,userE.isHeEnrolled);


module.exports = router;
