// controller.js

const User = require('../models/user');

// Fetch all 
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await User.findAll({
      where: {role: ['admin', 'instructor']}// Filter users by role 'student'
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({message: 'An error occurred while fetching employees.'});
  }
};
exports.getAllInstructors = async (req, res, next) => {
  try {
    const employees = await User.findAll({
      where: {role: [ 'instructor']}// Filter users by role 'student'
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({message: 'An error occurred while fetching employees.'});
  }
};
exports.getAllAdmins = async (req, res, next) => {
  try {
    const employees = await User.findAll({
      where: {role: ['admin']}// Filter users by role 'student'
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({message: 'An error occurred while fetching employees.'});
  }
};
// Add a new 
exports.addEmployee = async (req, res, next) => {
  const employeeData = req.body;

  try {
    const newEmployee = await User.create(employeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error adding !:', error);
    res.status(500).json({message: 'An error occurred while adding the intructor.'});
  }
}
exports.updateEmployee = async (req, res, next) => {
  const {cin} = req.params;
  const updatedData = req.body;

  try {
    // Find the student by CIN and update
    const [updatedRows] = await User.update(updatedData, {
      where: {CIN: cin}
    });

    if (updatedRows === 0) {
      return res.status(404).json({message: 'Employee not found.'});
    }

    res.status(200).json({message: 'Employee updated successfully.'});
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({message: 'An error occurred while updating the employee.'});
  }
};

// Delete 
exports.deleteEmployee = async (req, res, next) => {
  const {cin} = req.params;

  try {
    // Find 
    const deletedRows = await User.destroy({
      where: {CIN: cin}
    });

    if (deletedRows === 0) {
      return res.status(404).json({message: 'Instructor not found.'});
    }

    res.status(200).json({message: 'Instructor deleted successfully.'});
  } catch (error) {
    console.error('Error deleting Instructor:', error);
    res.status(500).json({message: 'An error occurred while deleting the instructor.'});
  }
};

// Search 
exports.searchEmployeeByCIN = async (req, res, next) => {
  const {cin} = req.params;

  try {
    // Find the student by CIN
    const instructor = await User.findOne({
      where: {CIN: cin}
    });

    if (!instructor) {
      return res.status(404).json({message: ' not found :<'});
    }

    res.status(200).json(instructor);
  } catch (error) {
    console.error('Error searching for :<', error);
    res.status(500).json({message: 'An error occurred while searching :<'});
  }
};
