const {DataTypes} = require('sequelize')
const db = require('../util/database');

const PasswordResetToken = db.define('PasswordResetToken', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
module.exports = PasswordResetToken;
