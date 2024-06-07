const { DataTypes } = require('sequelize');
const db = require('../util/database');
const User = require('../models/user');
const Vehicle = require('../models/Vehicle');
const InstructorStudentRelation = db.define('InstructorStudentRelation', {
  // Define any additional fields you may need for this relationship
});

// Define associations between InstructorStudentRelation, User (instructors and students)
InstructorStudentRelation.belongsTo(User, { as: 'instructor', foreignKey: 'instructorId' });
InstructorStudentRelation.belongsTo(User, { as: 'student', foreignKey: 'studentId' });
InstructorStudentRelation.belongsTo(Vehicle, { as: 'car', foreignKey: 'carId' });


// Export the InstructorStudentRelation model
module.exports = InstructorStudentRelation;