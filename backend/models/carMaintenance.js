// carMaintenanceModel.js

const {DataTypes} = require('sequelize');
const db = require('../util/database');
const Vehicle = require('./Vehicle');

const CarMaintenance = db.define('CarMaintenance', {
  Mcode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


//CarMaintenance.belongsTo(Vehicle); // categoriePermis references LicenseCategory table

module.exports = CarMaintenance;
