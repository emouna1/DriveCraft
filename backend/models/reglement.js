const {DataTypes} = require('sequelize');
const db = require('../util/database'); // Assuming your database connection
const User = require('./user');
const PaymentDetails = require('./paymentDetails')
const Payment = db.define('payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  
  isSuccessful: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Default value for isSuccessful
  }
});
//Payment.belongsTo(User, {foreignKey: 'StudentId'});
Payment.belongsTo(User, {foreignKey: 'candidatCIN', targetKey: 'CIN'});

Payment.hasMany(PaymentDetails);


module.exports = Payment;
