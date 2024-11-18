// db.js
const {Sequelize} = require('sequelize');
// Initialize Sequelize with your MySQL credentials
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_ROOT_PASSWORD,
 
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
  }
);
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
