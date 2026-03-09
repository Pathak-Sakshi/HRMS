const { sequelize } = require("../config/db");

const Employee = require("./employee.model");
const Attendance = require("./attendance.model");

Employee.hasMany(Attendance, {
  foreignKey: "employee_id",
  onDelete: "CASCADE"
});

Attendance.belongsTo(Employee, {
  foreignKey: "employee_id"
});

module.exports = {
  sequelize,
  Employee,
  Attendance
};