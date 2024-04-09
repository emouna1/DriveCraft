const User = require('../models/user');

// Fetch all students
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await User.findAll({
      where: { role: ['admin', 'instructor'] } // Filter users by role 'student'
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'An error occurred while fetching employees.' });
  }
};
