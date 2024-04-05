// licenseCategoryController.js

const LicenseC = require('../models/licenseCategory');

exports.getAllLicenseCategories = async (req, res, next) => {
  try {
    const licenseCategories = await LicenseC.findAll();
    res.status(200).json(licenseCategories);
  } catch (error) {
    console.error('Error fetching license categories:', error);
    res.status(500).json({message: 'An error occurred while fetching license categories.'});
  }
};


exports.addLicenseCategory = async (req, res, next) => {
  const LicenseCategoryData = req.body;

  try {
    const newLc = await LicenseC.create(LicenseCategoryData);
    res.status(201).json(newLc);
  } catch (error) {
    console.error('Error adding a new license driving category:', error);
    res.status(500).json({message: 'An error occurred while adding !'});
  }
};

exports.updateLicenseCategory = async (req, res, next) => {
  const {code} = req.params;
  const updatedData = req.body;

  try {
    const [updatedRows] = await LicenseC.update(updatedData, {
      where: {CategoryCode: code}
    });

    if (updatedRows === 0) {
      return res.status(404).json({message: ' not found.'});
    }

    res.status(200).json({message: ' updated successfully.'});
  } catch (error) {
    console.error('Error updating', error);
    res.status(500).json({message: 'An error occurred while updating.'});
  }
};

exports.deleteLicenseCategory = async (req, res, next) => {
  const {CategoryCode} = req.params;

  try {
    const deletedRows = await LicenseC.destroy({
      where: {CategoryCode: CategoryCode}
    });

    if (deletedRows === 0) {
      return res.status(404).json({message: 'not found.'});
    }

    res.status(200).json({message: 'deleted successfully.'});
  } catch (error) {
    console.error('Error deleting', error);
    res.status(500).json({message: 'An error occurred while deleting.'});
  }
};


