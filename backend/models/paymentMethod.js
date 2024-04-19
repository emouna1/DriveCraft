// paymentMethodModel.js

const {DataTypes} = require('sequelize');
const db = require('../util/database');

const PaymentMethod = db.define('PaymentMethod', {
 
  designation: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = PaymentMethod;
