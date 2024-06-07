const {DataTypes} = require('sequelize')
const db = require('../util/database');
const PaymentMethod = require('./paymentMethod')
const Payment = require('./reglement')
const PaymentDetails = db.define('paymentDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },


  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateEcheance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  verificationUrl: {
    type: DataTypes.STRING, // Assuming paymentCheckUrl is a string
    allowNull: true // Allow null values if paymentCheckUrl is optional
  },
 
});
PaymentDetails.belongsTo(PaymentMethod); // Add this association to link PaymentDetails with PaymentMethod

module.exports = PaymentDetails;
