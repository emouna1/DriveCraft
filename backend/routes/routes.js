const express = require('express');
const routerc = express.Router();
const VehicleC = require('../controllers/vehicleC');

routerc.get('/getAllCars', [], VehicleC.getAllVehicles);

routerc.post('/getCarByLpNum', [], VehicleC.getVehicleByLpNum);

routerc.post('/addCar', [], VehicleC.addVehicle);

routerc.put('/updateCar/:LicensePlate', [], VehicleC.updateVehicle);

routerc.delete('/deleteCar/:LicensePlate', [], VehicleC.deleteVehicle);


module.exports = routerc;
