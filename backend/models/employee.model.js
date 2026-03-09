const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Employee = sequelize.define("Employee", {
  employeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Employee ID must be unique"
    },
    validate: {
      notEmpty: {
        msg: "Employee ID cannot be empty"
      }
    }
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Full Name cannot be empty"
      },
      len: {
        args: [2, 100],
        msg: "Full Name must be between 2 and 100 characters"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Email must be unique"
    },
    validate: {
      isEmail: {
        msg: "Please provide a valid email address"
      },
      notEmpty: {
        msg: "Email cannot be empty"
      }
    }
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Department cannot be empty"
      }
    }
  }
}, {
  timestamps: true
});

module.exports = Employee;