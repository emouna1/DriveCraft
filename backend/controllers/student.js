// controller.js

const {User, Student}=require('../models/user');

// Fetch all students
exports.getAllStudents = async(req, res, next) => {
    try{
      const students = await Student.findAll({
        include: {
            model: User // Include the User model
        }
     } );
       res.status(200).json(students);
    }catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: 'An error occurred while fetching students.' });
    }
};

// Add a new student
exports.addStudent = async (req, res, next) => {
    // Extract student data from request body
    const studentData = req.body;

    try {
        // Create the student
        const newStudent = await User.create(studentData);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'An error occurred while adding the student.' });
    }
};

// Update a student by CIN
exports.updateStudent = async (req, res, next) => {
    const { cin } = req.params;
    const updatedData = req.body;

    try {
        // Find the student by CIN and update
        const [updatedRows] = await Student.update(updatedData, {
            where: { CIN: cin }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ message: 'Student updated successfully.' });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'An error occurred while updating the student.' });
    }
};

// Delete a student by CIN
exports.deleteStudent = async (req, res, next) => {
    const { cin } = req.params;

    try {
        // Find the student by CIN and delete
        const deletedRows = await Student.destroy({
            where: { CIN: cin }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ message: 'Student deleted successfully.' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student.' });
    }
};

// Search for a student by CIN
exports.searchStudentByCIN = async (req, res, next) => {
    const { cin } = req.params;

    try {
        // Find the student by CIN
        const student = await Student.findOne({
            where: { CIN: cin }
        });

        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error searching for student:', error);
        res.status(500).json({ message: 'An error occurred while searching for the student.' });
    }
};
