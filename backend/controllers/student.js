// controller.js

const User = require('../models/user');
const Image= require ('../models/image');
const multer = require('multer');



exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await User.findAll({
      where: { role: 'student' }, // Filter users by role 'student'
      //include: [{ model: Image, as: 'Image' }] // Include associated images with alias 'userImage'
    });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'An error occurred while fetching students.' });
  }
};


exports.addStudent = (req, res, next) => {
  // File upload middleware
  upload(req, res, async function (err) {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(500).json({ message: 'Error uploading image.' });
    }

    try {
      // Extract user data from request body
      const studentData = req.body;

      // If a file was uploaded, obtain the file path or URL
      const imagePath = req.file ? req.file.path : null;

      // Create the student with the image URL if an image was uploaded
      const newStudent = await User.create({
        ...studentData,
        image: imagePath // Assign the image path to the image field
      });

      res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ message: 'An error occurred while adding the student.' });
    }
  });
};



// Update a student by CIN
exports.updateStudent = async (req, res, next) => {
  const imageFile = req.file; // Get the uploaded image file from the request
  const { cin } = req.params;
  let { CIN, ...rest } = req.body; // Extract CIN separately
  CIN = String(CIN); // Ensure CIN is a string
  const updatedData = { ...rest, CIN }; // Reconstruct updatedData object
  
  // Now use updatedData in the update function
  
  try {
    // If an image file is provided, update the image path in the updatedData object
    if (imageFile) {
      updatedData.image = imageFile.path; // Assuming the image path is stored in the 'path' property of the image file
    }

    // Find the student by CIN and update
    const [updatedRows] = await User.update(updatedData, {
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
  const {cin} = req.params;

  try {
    // Find the student by CIN and delete
    const deletedRows = await User.destroy({
      where: {CIN: cin}
    });

    if (deletedRows === 0) {
      return res.status(404).json({message: 'Student not found.'});
    }

    res.status(200).json({message: 'Student deleted successfully.'});
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({message: 'An error occurred while deleting the student.'});
  }
};

// Search for a student by CIN
exports.searchStudentByCIN = async (req, res, next) => {
  const {cin} = req.params;

  try {
    // Find the student by CIN
    const student = await User.findOne({
      where: {CIN: cin}
    });

    if (!student) {
      return res.status(404).json({message: 'Student not found.'});
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error searching for student:', error);
    res.status(500).json({message: 'An error occurred while searching for the student.'});
  }
};
