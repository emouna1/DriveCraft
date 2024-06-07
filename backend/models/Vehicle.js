const {DataTypes} = require('sequelize');
const db = require('../util/database');
const CarMaintenance = require('./carMaintenance');
const users = require('../models/user')

const Vehicle = db.define('Vehicle', {

    LicensePlate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Power: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Fuel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Odometer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PurchasePrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Observation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }
);

Vehicle.hasMany(CarMaintenance);

module.exports = Vehicle;
