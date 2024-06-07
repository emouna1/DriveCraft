const bcrypt = require('bcryptjs');

const { Op } = require('sequelize');
const User = require('../models/user'); // Adjust the path to your user model
const Enrollment =require ('../models/Enrollment')
// Add a new user
exports.addUser = async (req, res) => {
    const { username, password, email, CIN, cnssNumber, firstName, name, dateOfIssue, situation, balance, dateOfBirth, nationality, address, telephone, personalCode, personnelFunction, recruitmentDate, netSalary, grossSalary, qualification, leaveDaysPerYear } = req.body;
    const imagePath = req.file ? req.file.path : null; // Check if an image was provided
  
    try {
      // Check for existing user with the same username, email, CIN, or cnssNumber
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }, { CIN }, { cnssNumber }]
        }
      });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username, Email, CIN, or CNSS Number already in use' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Create a new user
      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        CIN,
        cnssNumber,
        firstName,
        name,
        dateOfIssue,
        situation,
        balance,
        dateOfBirth,
        nationality,
        address,
        telephone,
        image: imagePath, // Assign the image path (can be null if no image provided)
        personalCode,
        personnelFunction,
        recruitmentDate,
        netSalary,
        grossSalary,
        qualification,
        leaveDaysPerYear
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    }
  };
  
// Update an existing user
/*exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, email, CIN, cnssNumber, ...otherFields } = req.body;
    const imagePath = req.file ? req.file.path : undefined;
  
    try {
      // Find the user by id
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check for existing user with the same username, email, or CIN (excluding the current user)
      const existingUser = await User.findOne({
        where: {
          id: { [Op.ne]: id },
          [Op.or]: [{ username }, { email }, { CIN }, { cnssNumber }]
        }
      });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username, Email, CIN, or CNSS Number already in use' });
      }
  
      // Hash the new password if provided
      let hashedPassword = user.password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 12);
      }
  
      // Update the user
      await user.update({
        username,
        password: hashedPassword,
        email,
        CIN,
        cnssNumber,
        image: imagePath || user.image,
        ...otherFields
      });
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  };
  */
  // Update an existing user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, email, CIN, cnssNumber, firstName, name, dateOfIssue, situation, balance, dateOfBirth, nationality, address, telephone, personalCode, personnelFunction, recruitmentDate, netSalary, grossSalary, qualification, leaveDaysPerYear } = req.body;
    const imagePath = req.file ? req.file.path : null; // Check if a new image was provided
  
    try {
      // Find the user by id
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check for existing user with the same username, email, CIN, or cnssNumber (excluding the current user)
      const existingUser = await User.findOne({
        where: {
          id: { [Op.ne]: id },
          [Op.or]: [{ username }, { email }, { CIN }, { cnssNumber }]
        }
      });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username, Email, CIN, or CNSS Number already in use' });
      }
  
      // Hash the new password if provided
      let hashedPassword = user.password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 12);
      }
  
      // Update the user
      await user.update({
        username,
        password: hashedPassword,
        email,
        CIN,
        cnssNumber,
        firstName,
        name,
        dateOfIssue,
        situation,
        balance,
        dateOfBirth,
        nationality,
        address,
        telephone,
        image: imagePath || user.image, // Use the new image path if provided, or keep the existing image
        personalCode,
        personnelFunction,
        recruitmentDate,
        netSalary,
        grossSalary,
        qualification,
        leaveDaysPerYear
      });
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  };
  

  // Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the user by id
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user
      await user.destroy();
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  };
  exports.isHeEnrolled= async (req, res) => {
    try {
      const enrollment = await Enrollment.findOne({ where: { candidatCIN: req.params.cin } });
      res.json({ enrolled: !!enrollment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }