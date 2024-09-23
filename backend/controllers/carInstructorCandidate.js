
const Vehicle = require('../models/Vehicle');
const User = require('../models/user'); // Adjust the path as necessary
const InstructorStudentRelation=require('../models/InstructorStudent')
const InstructorCandidateRelation = require('../models/InstructorStudent')


// Get all instructors with their associated students and cars
// Get all instructors with their associated students and cars
exports.getInstructorCandidateCar = async (req, res) => {
  try {
    const relations = await InstructorStudentRelation.findAll({
      include: [
        
        {
          model: User,
          as: 'instructor', // Referring to the instructor model
          where: { role: 'instructor' }, // Ensure you're fetching instructors
        },
        {
          model: User,
          as: 'student', // Referring to the student model
        },
        {
          model: Vehicle,
          as: 'car', // Referring to the vehicle model
        }
      ]
    });

    res.json(relations);
  } catch (error) {
    console.error('Error fetching instructors, students, and cars:', error);
    res.status(500).send('Internal server error');
  }
};



// Get all vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).send('Internal server error');
  }
};

// Assign a candidate to an instructor with a vehicle(the only right code here !)
exports.assignCandidate = async (req, res) => {
    try {
      const { instructorId, studentId, carId } = req.body; // Use 'studentId' and 'carId'
      
      console.log('Request body:', req.body);
      console.log('Student ID:', studentId);
      console.log('Instructor ID:', instructorId);
      console.log('Car ID:', carId);
      
      const student = await User.findByPk(studentId);
      const instructor = await User.findByPk(instructorId);
      const car = await Vehicle.findByPk(carId);
  
      if (!student || !instructor || !car) {
        return res.status(404).send('Student, Instructor, or Car not found');
      }
  
      await InstructorCandidateRelation.create({
        instructorId,
        studentId,     // This should match the foreign key in your model
        carId
      });
  
      res.status(201).send('Student assigned to instructor with car');
    } catch (error) {
      console.error('Error assigning student:', error);
      res.status(500).send('Internal server error');
    }
  };
  

// Remove a student from an instructor
exports.removeCandidate = async (req, res) => {
  try {
    const { instructorId, studentId } = req.params; // Renamed to 'studentId'

    // Find and delete the relation
    await InstructorCandidateRelation.destroy({
      where: { instructorId, studentId } // Changed to 'studentId'
    });

    res.status(200).send('Student removed from instructor');
  } catch (error) {
    console.error('Error removing student:', error);
    res.status(500).send('Internal server error');
  }
};

// Remove an assignment (unlink student from car)
exports.removeVehicleAssignment = async (req, res) => {
  try {
    const { instructorId, studentId, carId } = req.params; // Renamed to 'studentId' and 'carId'

    // Find and delete the relation
    await InstructorCandidateRelation.destroy({
      where: { instructorId, studentId, carId } // Changed to 'studentId' and 'carId'
    });

    res.status(200).send('Car assignment removed');
  } catch (error) {
    console.error('Error removing car assignment:', error);
    res.status(500).send('Internal server error');
  }
};
