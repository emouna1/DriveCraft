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
  }
});
PaymentDetails.belongsTo(PaymentMethod); // Add this association to link PaymentDetails with PaymentMethod

module.exports = PaymentDetails;
