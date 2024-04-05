const {Sequelize, DataTypes} = require('sequelize');
const db = require('../util/database');
const User = require('./user');
const LicenseCategory = require('./licenseCategory');
const Payment = require('./reglement');

const Enrollment = db.define('Enrollment', {
  candidatCIN: {
    type: DataTypes.STRING, // Specify allowed registration types
    allowNull: false,
  },
  candidatName: {
    type: DataTypes.STRING, // Specify allowed registration types
    allowNull: false,
  },
  candidatBalance: {
    type: DataTypes.FLOAT, // Specify allowed registration types
    allowNull: false,
  },
  registrationType: {
    type: DataTypes.ENUM('code', 'conduct'), // Specify allowed registration types
    allowNull: false,
  },
  contratType: {
    type: DataTypes.ENUM('fixed', 'variable'), // Use 'fixed' and 'variable' for English
    allowNull: false,
  },
  PricePerHour: {
    type: DataTypes.FLOAT, // Specify allowed registration types
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow for enrollments without immediate payment
    references: {
      model: Payment,
      key: 'id'
    }
  },

  specialPrice: {
    type: DataTypes.ENUM('yes', 'no'), // Special price (yes or no)
    allowNull: true,
  },
  specialPriceAmount: {
    type: DataTypes.FLOAT, // Special price amount
    allowNull: true,
    validate: {
      isSpecialPrice() {
        if (this.specialPrice === 'yes' && !this.specialPriceAmount) {
          throw new Error('Special price amount is required when special price is set to yes');
        }
      }
    }
  },
  registrationCosts: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  registrationFees: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },


  examDate: {
    type: DataTypes.DATEONLY, // Date of the exam
    allowNull: true,
  },

  desiredLicenseCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});

// Define foreign key relationships
//Enrollment.belongsTo(LicenseCategory, { foreignKey: 'CategoryCode' }); // categoriePermis references LicenseCategory table


Enrollment.belongsTo(User, {foreignKey: 'userId'});
Enrollment.belongsTo(LicenseCategory, {foreignKey: 'desiredLicenseCategory'});

module.exports = Enrollment;
