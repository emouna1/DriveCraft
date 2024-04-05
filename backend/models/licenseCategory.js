// licenseCategoryModel.js

const {DataTypes} = require('sequelize');
const db = require('../util/database');

const LicenseCategory = db.define('LicenseCategory', {
  Rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CategoryCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true

  },
  Designation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CodeRegistrationFees: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ConductRegistrationFees: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  CodeReviewPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  DrivingTestPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  PriceHourCode: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  PricePerHourDriven: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  CodeExamCancellationFee: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  DrivingTestCancellationFees: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = LicenseCategory;
