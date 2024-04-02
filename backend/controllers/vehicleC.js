
const Vehicle = require('../models/Vehicle'); // Import vehicle model


//get all vehicles
const getAllVehicles = async (req ,res) => {
    try{
        const vehicles = await Vehicle.findAll();
        console.log
        if (vehicles) {
            res.json({ vehicles })
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}
//get vehicle by license plate num
const getVehicleByLpNum = async(res, req) => {
      try{
          const vehicle= await Vehicle.findOne({where: {licensePlate: req.params.licensePlate}});
          if(vehicle){
            res.json(vehicle);

          }else{
            res.status(404).json({ message: 'vehicle not found'});}
          }catch(error){
            res.status(500).json({ message: error.message})
          }

 }
 const addVehicle = async (req, res) => {
    try {
        // Assuming you have a Vehicle model defined
        const vehicle = await Vehicle.create(req.body); // Assuming req.body contains the necessary data for creating a new vehicle
        res.status(201).json(vehicle); // Return the created vehicle
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update vehicle
const updateVehicle = async (req, res) =>{
//const {LicensePlate} = res.params;
const updatedVeicle=req.body;
try{
    const [rowsUpdated] = await Vehicle.update(updatedVeicle, {where: {LicensePlate: req.params.LicensePlate}})
    if(rowsUpdated ===1){
        res.json(updateVehicle)

    }else{
        res.status(404).json({ message:'Vehicle not found'})
    }
}catch(error){
    res.status(400).json({ message: error.message });
}
}

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
  */
const deleteVehicle = async (req, res) => {
    const { LicensePlate } = req.params;
    try {
      const rowsDeleted = await Vehicle.destroy({ where: { LicensePlate  } });
      if (rowsDeleted === 1) {
        res.json({ message: 'Vehicle deleted successfully!' });
      } else {
        res.status(404).json({ message: 'Vehicle not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports={getAllVehicles,getVehicleByLpNum,updateVehicle,deleteVehicle,addVehicle}