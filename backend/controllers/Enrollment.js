const codeEnrollment = require('../models/Enrollment');
const LicenseCategory = require('../models/licenseCategory');
const User = require('../models/user');
const Enrollment = require('../models/Enrollment')
//const {findByCIN } =require('../services/services')
const { sequelize } = require("../util/database");

exports.enrollmentsController = {
  // Get all enrollments
  /*async getAllEnrollments(req, res) {
    try {
      const enrollments = await codeEnrollment.findAll({
        include: [
          {
            model: User,
            attributes: ['CIN', 'name', 'balance'],
          },
        ],
      });

      for (const enrollment of enrollments) {
        // Conditionally include LicenseCategory based on registrationType
        if (enrollment.registrationType === 'code') {
          const licenseCategory = await LicenseCategory.findByPk(enrollment.desiredLicenseCategory, {
            attributes: ['CodeRegistrationFees', 'PriceHourCode'],
          });
          enrollment.LicenseCategory = licenseCategory;
        } else if (enrollment.registrationType === 'conduct') {
          const licenseCategory = await LicenseCategory.findByPk(enrollment.desiredLicenseCategory, {
            attributes: ['ConductRegistrationFees', 'PricePerHourDriven'],
          });
          enrollment.LicenseCategory = licenseCategory;
        }
      }

      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },*/

  async getAllEnrollments(req, res) {
    try {
      const enrollments = await Enrollment.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'balance'],
          },
        ],
      });
  
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a new enrollment
  async createEnrollment(req, res) {
    try {
      const enrollmentData = req.body;
  
      if (enrollmentData.registrationType === 'code' ) {
        const licenseCategory = await LicenseCategory.findByPk(enrollmentData.desiredLicenseCategory, {
          attributes: ['CodeRegistrationFees', 'PriceHourCode'],
        });
        enrollmentData.PricePerHour = licenseCategory.PriceHourCode;
        enrollmentData.registrationFees= licenseCategory.CodeRegistrationFees
      } else if (enrollmentData.registrationType === 'conduct' ){
        const licenseCategory = await LicenseCategory.findByPk(enrollmentData.desiredLicenseCategory, {
          attributes: ['ConductRegistrationFees', 'PriceHourDriven'],
        });
        enrollmentData.PricePerHour = licenseCategory.PricePerHourDriven;
        enrollmentData.registrationFees= licenseCategory.ConductRegistrationFees;
      }

      
      // Include the student's name and balance in the enrollment data
      const user = await User.findByCIN(enrollmentData.candidatCIN);
      enrollmentData.candidatName = user.name;
      enrollmentData.candidatBalance = user.balance;

      // Save the enrollment data
      const savedEnrollment = await codeEnrollment.create(enrollmentData);
      console.log('New enrollment added:', savedEnrollment);
      res.status(201).json(savedEnrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete an enrollment
  async deleteEnrollment(req, res) {
    try {
      const enrollmentId = req.params.id;
      await codeEnrollment.destroy({ where: { id: enrollmentId } });
      res.json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update an enrollment
  async updateEnrollment(req, res) {
    try {
      const enrollmentId = req.params.id;
      const updatedData = req.body;

      const enrollment = await codeEnrollment.findByPk(enrollmentId);
      if (!enrollment) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      // Retrieve the associated LicenseCategory
      const licenseCategory = await LicenseCategory.findByPk(updatedData.desiredLicenseCategory);

      // Validate registrationCosts based on registrationType
      if (updatedData.registrationType === 'code' && updatedData.registrationCosts !== licenseCategory.CodeRegistrationFees) {
        throw new Error('Registration costs do not match those specified in the associated LicenseCategory.');
      } else if (updatedData.registrationType === 'conduct' && updatedData.registrationCosts !== licenseCategory.ConductRegistrationFees) {
        throw new Error('Registration costs do not match those specified in the associated LicenseCategory.');
      }

      // Check if the PriceHourCode/PricePerHourDriven matches the LicenseCategory's value
      if (updatedData.registrationType === 'code' && updatedData.priceHourCode !== licenseCategory.PriceHourCode) {
        throw new Error('PriceHourCode does not match the associated LicenseCategory.');
      } else if (updatedData.registrationType === 'conduct' && updatedData.pricePerHourDriven !== licenseCategory.PricePerHourDriven) {
        throw new Error('PricePerHourDriven does not match the associated LicenseCategory.');
      }

      // Include the student's name and balance in the enrollment data
      const user = await User.findByPk(updatedData.CIN);
      updatedData.studentName = user.name;
      updatedData.studentBalance = user.balance;

      // Update the enrollment data
      await codeEnrollment.update(updatedData, { where: { id: enrollmentId } });
      res.json(enrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
