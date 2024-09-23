// db.js
const {Sequelize} = require('sequelize');
// Load environment variables
// Initialize Sequelize with your MySQL credentials
const sequelize = new Sequelize('drivecraft', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = sequelize;
