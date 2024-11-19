// db.js
// At the top of your file, ensure dotenv is loaded
require('dotenv').config();

// Log environment variables to ensure they are being loaded correctly
console.log('MYSQL_URL:', process.env.MYSQL_URL);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('RAILWAY_TCP_PROXY_DOMAIN:', process.env.RAILWAY_TCP_PROXY_DOMAIN);
console.log('RAILWAY_TCP_PROXY_PORT:', process.env.RAILWAY_TCP_PROXY_PORT);


const {Sequelize} = require('sequelize');

// Initialize Sequelize with your MySQL credentials
const sequelize = new Sequelize(process.env.MYSQL_URL, {
dialect: 'mysql',
dialectOptions: {
  connectTimeout: 10000, // Timeout in milliseconds
},
logging: console.log, // Optional: Helps debug SQL queries
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
