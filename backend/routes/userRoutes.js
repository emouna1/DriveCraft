// routes.js

const express = require('express');
const userRouter = express.Router();
const studentController = require('../controllers/student');
const eController = require('../controllers/Personnel')
const userController = require('../controllers/userController'); // Adjust the path to your userController
const { upload } = require('../controllers/multer'); // Adjust the path to your multer config

// Define routes
userRouter.get('/getAllStudents', [], studentController.getAllStudents);
userRouter.post('/addStudent', [], studentController.addStudent);
userRouter.put('/updateStudent/:cin', upload.single('image'), studentController.updateStudent);
userRouter.delete('/deleteStudent/:cin', [], studentController.deleteStudent);
userRouter.get('/students/:cin', [], studentController.searchStudentByCIN);

const instructorController = require('../controllers/InstructorCandidatRelation')
userRouter.get('/instructor-for-candidate/:candidateId', instructorController.getInstructorForCandidate);
userRouter.get('/getLessonsForInstructor/:instructorId', instructorController.getLessonsForInstructor);
userRouter.get('/getExamsForInstructor/:instructorId', instructorController.getExamsForInstructor);
userRouter.get('/getStudentsForInstructor/:instructorId', instructorController.getCandidatesForInstructor);





userRouter.get('/getAllInstructors', [], eController.getAllInstructors);
userRouter.get('/getAllAdmins', [], eController.getAllAdmins);
userRouter.get('/getAllEmployees', [], eController.getAllEmployees);
userRouter.post('/addEmployee', [], eController.addEmployee);
userRouter.put('/updateEmployee/:cin', [], eController.updateEmployee);
userRouter.delete('/deleteEmployee/:cin', [], eController.deleteEmployee);



// Add a new user with an image
userRouter.post('/addUser', upload.single('image'), userController.addUser);

// Update an existing user (with optional image upload)
userRouter.put('/updateUser/:id', upload.single('image'), userController.updateUser);

// Delete a user
userRouter.delete('/deleteUser/:id', userController.deleteUser);









module.exports = userRouter;
