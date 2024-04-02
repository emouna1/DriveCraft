// controller.js

const {User, Instructor,Admin}=require('../models/user');

// Fetch all students
exports.getAllEmployees = async(req, res, next) => {
    try{
      const employees = await Instructor.findAll({
        include: {
            model: User // Include the User model
        }
     } );
       res.status(200).json(employees);
    }catch (error) {
      console.error('Error fetching instructors:', error);
      res.status(500).json({ message: 'An error occurred while fetching instructors.' });
    }
};

// Add a new student
exports.addEmploye = async (req, res, next) => {
    // Extract student data from request body
    const employeeData = req.body;

    try {
        // Create the student
        const newEmployee = await Instructor.create(employeeData);
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'An error occurred while adding the intructor.' });
    }
};

// Update a student by CIN
exports.updateEmployee = async (req, res, next) => {
    const { cin } = req.params;
    const updatedData = req.body;

    try {
        // Find the student by CIN and update
        const [updatedRows] = await Instructor.update(updatedData, {
            where: { CIN: cin }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'An error occurred while updating the employee.' });
    }
};

// Delete a student by CIN
exports.deleteEmployee = async (req, res, next) => {
    const { cin } = req.params;

    try {
        // Find the student by CIN and delete
        const deletedRows = await Instructor.destroy({
            where: { CIN: cin }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Instructor not found.' });
        }

        res.status(200).json({ message: 'Instructor deleted successfully.' });
    } catch (error) {
        console.error('Error deleting Instructor:', error);
        res.status(500).json({ message: 'An error occurred while deleting the instructor.' });
    }
};

// Search for a student by CIN
exports.searchStudentByCIN = async (req, res, next) => {
    const { cin } = req.params;

    try {
        // Find the student by CIN
        const instructor = await Instructor.findOne({
            where: { CIN: cin }
        });

        if (!instructor) {
            return res.status(404).json({ message: ' not found :<' });
        }

        res.status(200).json(instructor);
    } catch (error) {
        console.error('Error searching for :<', error);
        res.status(500).json({ message: 'An error occurred while searching :<' });
    }
};
