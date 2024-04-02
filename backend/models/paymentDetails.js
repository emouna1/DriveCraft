const { DataTypes } = require('sequelize')
const db = require('../util/database');
const PaymentMethod=require('./paymentMethod')
const Payment=require('./règlement')
const PaymentDetails = db.define('paymentDetails', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    idPayementMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: PaymentMethod,
        key: 'method'
      }
    },
    montant:{
        type: DataTypes.FLOAT,
        allowNull: false, 
    },
    dateEcheance:{
        type: DataTypes.DATE,
        allowNull: false, 
    }
  });

module.exports = PaymentDetails;
