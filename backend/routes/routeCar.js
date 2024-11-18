const express = require('express');
const routerCar = express.Router();
const instructorCandidateController = require('../controllers/carInstructorCandidate');

/*routerCar.get('/candidates', instructorCandidateController.getCandidates);*/
routerCar.get('/list', instructorCandidateController.getInstructorCandidateCar);
routerCar.get('/vehicles', instructorCandidateController.getVehicles);
routerCar.get('/instructors', instructorCandidateController.getAllInstructors);
routerCar.get('/candidates', instructorCandidateController.getAllStudents);


routerCar.post('/assign-candidate', instructorCandidateController.assignCandidate);
routerCar.delete('/remove-candidate/:candidateId/:instructorId', instructorCandidateController.removeCandidate);
routerCar.delete('/remove-assignment/:candidateId/:instructorId/:vehicleId', instructorCandidateController.removeVehicleAssignment);

module.exports = routerCar;
