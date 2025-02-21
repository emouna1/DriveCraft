const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User  = require('../models/user'); // Import the User model

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()); // Log the validation errors to see what's failing

    return res.status(422).json({ errors: errors.array() }); // Return validation errors
  }

  const {
    username,
    email,
    role,
    password,
    name,
    firstName,
    CIN,
    dateOfIssue,
    situation,
    balance,
    dateOfBirth,
    nationality,
    address,
    telephone,
    image,
    personalCode,
    personnelFunction,
    recruitmentDate,
    netSalary,
    grossSalary,
    qualification,
    leaveDaysPerYear,
    cnssNumber,
    CategoryCode
  } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(422).json({ message: 'Email address already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      role,
      password: hashedPassword,
      name,
      firstName,
      CIN,
      dateOfIssue,
      situation,
      balance,
      dateOfBirth,
      nationality,
      address,
      telephone,
      image,
      personalCode,
      personnelFunction,
      recruitmentDate,
      netSalary,
      grossSalary,
      qualification,
      leaveDaysPerYear,
      cnssNumber,
      CategoryCode
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      'Emounaaa', // actual secret key
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(201).json({ message: 'User registered!', token: token });
  } catch (err) {
    console.error('Error during signup:', err);
    // Log the specific error message
    console.error('Error message:', err.message);
    // Log the stack trace for more detailed error information
    console.error('Stack trace:', err.stack);
    res.status(500).json({ message: 'An error occurred while signing up. Please try again later.' });
  }
};
