const {DataTypes} = require('sequelize');
const db = require('../util/database');
const LicenseCategory = require('./licenseCategory');
const Image=require('./image')
const Vehicle=require('../models/Vehicle')
const users = db.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,


  },
  role: {
    type: DataTypes.ENUM('admin', 'instructor', 'student'),
    defaultValue: 'student',
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CIN: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  dateOfIssue: {
    type: DataTypes.DATE,
    allowNull: true
  },

  situation: {
    type: DataTypes.ENUM('without code', 'with code', 'license obtained'),
    defaultValue: 'without code',
    allowNull: false
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  personalCode: {
    type: DataTypes.STRING, // Properties for instructor
    allowNull: true, // If instructor, this field will be populated
  },
  personnelFunction: {
    type: DataTypes.STRING, // Properties for instructor
    allowNull: true, // If instructor, this field will be populated
  },
  recruitmentDate: {
    type: DataTypes.DATE, // Properties for instructor
    allowNull: true, // If instructor, this field will be populated
  },
  netSalary: {
    type: DataTypes.FLOAT, // Properties for instructor
    allowNull: true, // If instructor, this field will be populated
  },
  grossSalary: {
    type: DataTypes.FLOAT, // Properties for instructor
    allowNull: true, // If instructor, this field will be populated
  },
  qualification: {
    type: DataTypes.STRING, // Properties for instructor
    allowNull: true, // If instructor, this field will be populated
  },
  leaveDaysPerYear: {
    type: DataTypes.INTEGER, // Properties for instructor
    allowNull: true, // If instructor, this field will be populated
  },
  cnssNumber: {
    type: DataTypes.STRING, // Properties for instructor
    allowNull: true, // If instructor, this field will be populated
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false
  }

},{
  indexes: [{
  unique: true,
  fields: ['username'],
},
    {
      unique: true,
      fields: ['cnssNumber']
    },
    {
      unique: true,
      fields: ['email']
    },
    { unique: true,
     fields: ['CIN']
    }

]}
);


users.belongsTo(LicenseCategory, {foreignKey: 'CategoryCode'});

//users.belongsTo(Image, { foreignKey: 'imageUrl', as: 'Image' });
//users.hasMany(LessonExam, { foreignKey: 'candidateId', as: 'candidateScedule' });
//users.hasMany(LessonExam, { foreignKey: 'instructorId', as: 'instructorSchedule' });

// Define the findByEmail method in users
users.findByEmail = async function (email) {
  return await users.findOne({
    where: {
      email: email
    }
  });
};
users.findByCIN = async function (candidatCIN) {
  try {
    const user = await users.findOne({
      where: {
        CIN: candidatCIN
      }
    });
    return user;
  } catch (error) {
    throw new Error('Error finding users by CIN: ' + error.message);
  }
};


// Export all models
module.exports = users;





