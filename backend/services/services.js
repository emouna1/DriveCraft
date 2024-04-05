const {User} = require('../models/user');

// Function to find a user by CIN (National Identity Card Number)
async function findByCIN(candidatCIN) {
  try {
    const user = await User.findOne({
      where: {
        CIN: candidatCIN
      }
    });
    return user;
  } catch (error) {
    throw new Error('Error finding user by CIN: ' + error.message);
  }
}

module.exports = {
  findByCIN
};
