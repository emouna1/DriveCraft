

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');
const loginController = require('../controllers/login');
const forgotPasswordController = require('../controllers/forgotpassword');
// POST /auth/signup
/*router.post('/signup', [
    check('username').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('name').not().isEmpty(),
    check('firstName').not().isEmpty(),
    check('CIN').not().isEmpty(),
    check('dateOfIssue').isISO8601().toDate(),
    check('licenseCategory').not().isEmpty(),
    check('situation').not().isEmpty(),
    check('balance').not().isEmpty(),
    check('dateOfBirth').isISO8601().toDate(),
    check('nationality').not().isEmpty(),
    check('address').not().isEmpty(),
    check('telephone').not().isEmpty()
], authController.signup);*/
router.post('/signup', [
    check('username').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    // Adjust validation rules for properties that can be null
    check('name').optional().not().isEmpty(),
    check('firstName').optional().not().isEmpty(),
    check('CIN').optional().not().isEmpty(),
    check('dateOfIssue').optional().isISO8601().toDate(),
    check('licenseCategory').optional().not().isEmpty(),
    check('situation').optional().not().isEmpty(),
    check('balance').optional().not().isEmpty(),
    check('dateOfBirth').optional().isISO8601().toDate(),
    check('nationality').optional().not().isEmpty(),
    check('address').optional().not().isEmpty(),
    check('telephone').optional().not().isEmpty(),
    check('personalCode').optional().not().isEmpty(),
    check('personnelFunction').optional().not().isEmpty(),
    check('recruitmentDate').optional().not().isEmpty(),
    check('netSalary').optional().not().isEmpty(),
    check('grossSalary').optional().not().isEmpty(),
    check('qualification').optional().not().isEmpty(),
    check('leaveDaysPerYear').optional().not().isEmpty(),
    check('cnssNumber').optional().not().isEmpty()
], authController.signup);


// POST /auth/login
router.post('/login', [
    check('username').not().isEmpty(),
    check('password').isLength({ min: 6 })
], loginController.login);

// auth/logout
router.post('/logout', (req, res) => {
    // Since JWTs are stateless, there's no need to do anything here
    // Just send a success response indicating logout successful
    res.status(200).json({ message: 'Logout successful' });
});

// auth/forgotpassword

//router.post('/forgotpassword', forgotPasswordController.requestPasswordReset);
router.post('/forgotpassword', [
    check('email').isEmail()
], forgotPasswordController.requestPasswordReset);

router.post('/resetpassword', [
    check('email').isEmail(),
    check('token').notEmpty(),
    check('newPassword').isLength({ min: 6 }) // Adjust validation as needed
], forgotPasswordController.resetPassword);

module.exports = router;
