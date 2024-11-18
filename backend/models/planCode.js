// models/codeLessonExam.js
const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');
const User = require('../models/user')
const Vehicle = require('../models/Vehicle');

const LessonExam = sequelize.define('CodeLessonExam', {

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startHour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endHour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  taskCategory: {
    type: DataTypes.ENUM('code', 'conduct'),
    allowNull: false,
  },
  taskType: {
    type: DataTypes.ENUM('exam', 'lesson'),
    allowNull: false,
  },
  result: {
    type: DataTypes.ENUM('failed', 'success', 'canceled'),
    allowNull: true,
  },
  accomplished: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  candidatCIN: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructorId: {
    type: DataTypes.STRING, // or DataTypes.INTEGER, depending on your CIN or ID type
    allowNull: true,
  },
  vehicleId: {
    type: DataTypes.INTEGER, // Assuming vehicleId is an integer
    allowNull: true,
  },

});
LessonExam.beforeCreate((lessonExam, options) => {
  if (lessonExam.taskType === 'lesson') {
    // If the task is a lesson, set the accomplished property to null
    lessonExam.result = null;
  } else {
    // If the task is an exam, set the result property to null
    lessonExam.accomplished = null;
  }
});
LessonExam.belongsTo(User, {foreignKey: 'candidatCIN', targetKey: 'CIN'});
LessonExam.belongsTo(User) // Associate with instructor
LessonExam.belongsTo(Vehicle, { foreignKey: 'vehicleId' }); // Associate with vehicle

module.exports = LessonExam;
