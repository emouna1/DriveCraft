// routes.js

const express = require('express');
const userRouter = express.Router();
const studentController = require('../controllers/student');
const eController = require('../controllers/Personnel')

// Define routes
userRouter.get('/getAllStudents', [], studentController.getAllStudents);
userRouter.post('/addStudent', [], studentController.addStudent);
userRouter.put('/updateStudent/:cin', [], studentController.updateStudent);
userRouter.delete('/deleteStudent/:cin', [], studentController.deleteStudent);
userRouter.get('/students/:cin', [], studentController.searchStudentByCIN);

userRouter.get('/getAllInstructors', [], eController.getAllInstructors);
userRouter.get('/getAllAdmins', [], eController.getAllAdmins);
userRouter.get('/getAllEmployees', [], eController.getAllEmployees);
userRouter.post('/addEmployee', [], eController.addEmployee);
userRouter.put('/updateEmployee/:cin', [], eController.updateEmployee);
userRouter.delete('/deleteEmployee/:cin', [], eController.deleteEmployee);

module.exports = userRouter;
