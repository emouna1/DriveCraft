

const { DataTypes } = require('sequelize');
const db = require('../util/database');
const LicenseCategory = require('./licenseCategory');

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        allowNull: true
    },
    CIN: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
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
        allowNull: true
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true // Assuming image is optional
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
        unique: true
    }
});


User.belongsTo(LicenseCategory, { foreignKey: 'CategoryCode' });

// Define the findByEmail method in User
User.findByEmail = async function(email) {
    return await User.findOne({
        where: {
            email: email
        }
    });
};
User.findByCIN = async function(candidatCIN) {
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
};



// Export all models
module.exports = User;