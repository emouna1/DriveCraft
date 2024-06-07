/*const express = require('express');
const routerc = express.Router();
const VehicleC = require('../controllers/vehicleC');

routerc.get('/getAllCars', [], VehicleC.getAllVehicles);

routerc.post('/getCarByLpNum', [], VehicleC.getVehicleByLpNum);

routerc.post('/addCar', [], VehicleC.addVehicle);

routerc.put('/updateCar/:LicensePlate', [], VehicleC.updateVehicle);

routerc.delete('/deleteCar/:LicensePlate', [], VehicleC.deleteVehicle);


module.exports = routerc;*/
const express = require('express');
const routerc = express.Router();
const VehicleC = require('../controllers/vehicleC');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
// Middleware for handling multipart/form-data (file uploads)

routerc.get('/getAllCars', VehicleC.getAllVehicles);

routerc.get('/getCarByLpNum/:licensePlate', VehicleC.getVehicleByLpNum);

routerc.post('/addCar', upload.single('image'), VehicleC.addVehicle);

routerc.put('/updateCar/:LicensePlate', upload.single('image'), VehicleC.updateVehicle);

routerc.delete('/deleteCar/:LicensePlate', VehicleC.deleteVehicle);

module.exports = routerc;
