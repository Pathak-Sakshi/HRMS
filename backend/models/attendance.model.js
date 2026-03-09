const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Attendance = sequelize.define("Attendance", {
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Employees",
      key: "id"
    },
    validate: {
      notEmpty: {
        msg: "Employee ID is required"
      }
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Date is required"
      },
      isDate: {
        msg: "Please provide a valid date"
      }
    }
  },
  status: {
    type: DataTypes.ENUM("Present", "Absent"),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Status is required"
      },
      isIn: {
        args: [["Present", "Absent"]],
        msg: "Status must be either Present or Absent"
      }
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["employee_id", "date"],
      msg: "Attendance already marked for this employee on this date"
    }
  ]
});

module.exports = Attendance;