const Vehicle = require('../models/Vehicle'); // Import vehicle model
const path = require('path'); // Import the path module
const fs = require('fs'); // Import the fs module

//get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    console.log
    if (vehicles) {
      res.json({vehicles})
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
//get vehicle by license plate num
const getVehicleByLpNum = async (res, req) => {
  try {
    const vehicle = await Vehicle.findOne({where: {licensePlate: req.params.licensePlate}});
    if (vehicle) {
      res.json(vehicle);

    } else {
      res.status(404).json({message: 'vehicle not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

}
/*
const addVehicle = async (req, res) => {
  try {
    // Assuming you have a Vehicle model defined
    const vehicle = await Vehicle.create(req.body); // Assuming req.body contains the necessary data for creating a new vehicle
    res.status(201).json(vehicle); // Return the created vehicle
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

//update vehicle
const updateVehicle = async (req, res) => {
//const {LicensePlate} = res.params;
  const updatedVeicle = req.body;
  try {
    const [rowsUpdated] = await Vehicle.update(updatedVeicle, {where: {LicensePlate: req.params.LicensePlate}})
    if (rowsUpdated === 1) {
      res.json(updateVehicle)

    } else {
      res.status(404).json({message: 'Vehicle not found'})
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}
*/

// Add a vehicle
const addVehicle = async (req, res) => {
  try {
    // Check if the license plate already exists
    const existingVehicle = await Vehicle.findOne({ where: { LicensePlate: req.body.LicensePlate } });
    if (existingVehicle) {
      return res.status(400).json({ message: 'License plate already exists' });
    }
 

    //const imageUrl = req.file.path;
    const imageUrl = `/images/${req.file.filename}`;

    const newVehicle = {
      ...req.body,
      Image: imageUrl
    };

    const vehicle = await Vehicle.create(newVehicle);
    res.status(201).json(vehicle); // Return the created vehicle
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vehicle
const updateVehicle = async (req, res) => {
  try {
    const { file } = req;
    const updatedVehicle = {
      ...req.body,
      Image: file ? `/images/${file.filename}` : req.body.Image
    };

    const [rowsUpdated] = await Vehicle.update(updatedVehicle, { where: { LicensePlate: req.params.LicensePlate } });
    if (rowsUpdated === 1) {
      res.json(updatedVehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
/*const updateVehicle = async (req, res) => {
    const updatedVehicle = req.body;
    try {
      const [rowsUpdated] = await Vehicle.update(updatedVehicle, { where: { id: req.params.id } });
      if (rowsUpdated === 1) {
        res.json(updatedVehicle);
      } else {
        res.status(404).json({ message: 'Vehicle not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
const deleteVehicle = async (req, res) => {
  const {LicensePlate} = req.params;
  try {
    const rowsDeleted = await Vehicle.destroy({where: {LicensePlate}});
    if (rowsDeleted === 1) {
      res.json({message: 'Vehicle deleted successfully!'});
    } else {
      res.status(404).json({message: 'Vehicle not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};*/
const deleteVehicle = async (req, res) => {
  const { LicensePlate } = req.params;
  try {
    // Find the vehicle to get its image URL
    const vehicle = await Vehicle.findOne({ where: { LicensePlate } });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Delete the associated image file from the server
    if (vehicle.Image) {
      const imagePath = path.join(__dirname, '..', vehicle.Image);
      fs.unlinkSync(imagePath);
    }

    // Delete the vehicle from the database
    await Vehicle.destroy({ where: { LicensePlate } });

    res.json({ message: 'Vehicle deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {getAllVehicles, getVehicleByLpNum, updateVehicle, deleteVehicle, addVehicle}
