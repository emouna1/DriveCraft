const { DataTypes } = require('sequelize');
const db = require('../util/database');

const Image = db.define('image', {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entityType: {
    type: DataTypes.STRING,
    allowNull: false // You might want to validate this based on predefined entity types
  },
  /*entityId: {
    type: DataTypes.INTEGER,
    allowNull: false // Assuming entity IDs are integers
  }*/
});

module.exports = Image;
