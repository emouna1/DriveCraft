const LicenseCategory = require('../models/licenseCategory');
const User = require('../models/user');
const Enrollment = require('../models/Enrollment')
//const {findByCIN } =require('../services/services')
const {sequelize} = require("../util/database");

exports.enrollmentsController = {
  // Get all enrollments


  async getAllEnrollments(req, res) {
    try {
      const enrollments = await Enrollment.findAll({});

      res.json(enrollments);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },

  // Add a new enrollment
  async createEnrollment(req, res) {
    try {
      const enrollmentData = req.body;
      const existingEnrollment = await Enrollment.findOne({
        where: {candidatCIN: enrollmentData.candidatCIN}
      });

      if (existingEnrollment) {
        // If an enrollment with the same CIN exists, return an error
        return res.status(400).json({error: 'An enrollment with this CIN already exists.'});
      }
      if (enrollmentData.registrationType === 'code') {
        const licenseCategory = await LicenseCategory.findByPk(enrollmentData.desiredLicenseCategory, {
          attributes: ['CodeRegistrationFees', 'PriceHourCode'],
        });
        enrollmentData.PricePerHour = licenseCategory.PriceHourCode;
        enrollmentData.registrationFees = licenseCategory.CodeRegistrationFees
      } else if (enrollmentData.registrationType === 'conduct') {
        const licenseCategory = await LicenseCategory.findByPk(enrollmentData.desiredLicenseCategory, {
          attributes: ['ConductRegistrationFees', 'PricePerHourDriven'],
        });
        enrollmentData.PricePerHour = licenseCategory.PricePerHourDriven;
        enrollmentData.registrationFees = licenseCategory.ConductRegistrationFees;
      }


      // Include the student's name and balance in the enrollment data
      const user = await User.findByCIN(enrollmentData.candidatCIN);
      console.log(user)
      enrollmentData.candidatName = user.name;
      enrollmentData.candidatBalance = user.balance;

      // Save the enrollment data
      const savedEnrollment = await Enrollment.create(enrollmentData);
      console.log('New enrollment added:', savedEnrollment);
      res.status(201).json(savedEnrollment);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  },

  // Delete an enrollment
  async deleteEnrollment(req, res) {
    try {
      const enrollmentId = req.params.id;
      await codeEnrollment.destroy({where: {id: enrollmentId}});
      res.json({message: 'Enrollment deleted successfully'});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },
  async updateEnrollment(req, res) {
    try {
      const enrollmentId = req.params.id;
      const updatedData = req.body;

      const enrollment = await codeEnrollment.findByPk(enrollmentId);
      if (!enrollment) {
        return res.status(404).json({error: 'Enrollment not found'});
      }

      // Prevent certain properties from being updated
      const immutableProperties = ['registrationType', 'candidatCIN'];
      for (const property of immutableProperties) {
        if (updatedData[property] !== undefined && updatedData[property] !== enrollment[property]) {
          return res.status(400).json({error: `${property} cannot be updated`});
        }
      }

      // Update the allowed properties
      const allowedProperties = ['desiredLicenseCategory', 'registrationCosts', 'priceHourCode', 'pricePerHourDriven'];
      for (const property of allowedProperties) {
        if (updatedData[property] !== undefined) {
          enrollment[property] = updatedData[property];
        }
      }

      // Save the updated enrollment data
      await enrollment.save();

      res.json(enrollment);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }


};
