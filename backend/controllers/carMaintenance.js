// carMaintenanceController.js

const carMaintenance = require('../models/carMaintenance');

exports.getAllCarMaintenance = async (req, res, next) => {
    try {
        const carM = await carMaintenance.findAll();
        res.status(200).json(carM);
    } catch (error) {
        console.error('Error fetching car maintenance:', error);
        res.status(500).json({ message: 'An error occurred while fetching car maintenance.' });
    }
};

// Other controller functions for CRUD operations on Car Maintenance
exports.addM = async (req, res, next) => {
    const carMaintenanceData = req.body;

    try {
        const newCm = await carMaintenance.create(carMaintenanceData);
        res.status(201).json(newCm);
    } catch (error) {
        console.error('Error adding a new car maintenance:', error);
        res.status(500).json({ message: 'An error occurred while adding !' });
    }
};

exports.updateM = async (req, res, next) => {
    const { code } = req.params;
    const updatedData = req.body;

    try {
        const [updatedRows] = await carMaintenance.update(updatedData, {
            where: { Mcode: code }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: ' not found.' });
        }

        res.status(200).json({ message: ' updated successfully.' });
    } catch (error) {
        console.error('Error updating', error);
        res.status(500).json({ message: 'An error occurred while updating.' });
    }
};

exports.deleteM = async (req, res, next) => {
    const { code } = req.params;

    try {
        const deletedRows = await carMaintenance.destroy({
            where: { Mcode: code }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'not found.' });
        }

        res.status(200).json({ message: 'deleted successfully.' });
    } catch (error) {
        console.error('Error deleting', error);
        res.status(500).json({ message: 'An error occurred while deleting.' });
    }
};


