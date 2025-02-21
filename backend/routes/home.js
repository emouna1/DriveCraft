const express = require('express');
const homeRouter = express.Router();
const {enrollmentsController} = require('../controllers/Enrollment');

// Route to get all enrollments
homeRouter.get('/getAllEnrollments', enrollmentsController.getAllEnrollments);
homeRouter.get('/getCodeEnrollments', enrollmentsController.getCodeEnrollments);
homeRouter.get('/getConductEnrollments', enrollmentsController.getConductEnrollments);

// Route to create a new enrollment
homeRouter.post('/addEnrollment', enrollmentsController.createEnrollment);

// Route to update an enrollment
homeRouter.put('/updateEnrollment/:candidatCIN', enrollmentsController.updateEnrollment);

// Route to delete an enrollment
homeRouter.delete('/deleteEnrollment/:id', enrollmentsController.deleteEnrollment);


const {codeLessonExamController} = require('../controllers/planCode');

// Routes for code lessons and exams
//homeRouter.get('/code-lesson-exams', codeLessonExamController.getAllCodeLessonExams);
homeRouter.get('/code-lessons', codeLessonExamController.getAllLessons);
homeRouter.get('/code-exams', codeLessonExamController.getAllExams);

homeRouter.delete('/code-lesson-exams/:id', codeLessonExamController.deleteCodeLessonExam);
homeRouter.put('/code-lesson-exams/:id', codeLessonExamController.updateCodeLessonExam);
homeRouter.post('/code-lesson-exams', codeLessonExamController.createCodeLessonExam);


module.exports = homeRouter;
