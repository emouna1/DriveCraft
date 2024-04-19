const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');




  
  exports.changePassword = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const { email, oldPassword, newPassword } = req.body;
  
      // Find the user by email
     // const user = await User.findOne({ where: { email } });
     const user = await User.findByEmail(email);

      // If user doesn't exist
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Verify the old password
      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
  
      // Update the user's password in the database
      await user.update({ password: hashedNewPassword });
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
      console.error('Error changing password:', err);
      res.status(500).json({ message: 'An error occurred while changing the password' });
    }
  };