const Employee = require("../models/employee.model");
const { Op } = require("sequelize");

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.addEmployee = async (req, res, next) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    // Validate required fields
    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Trim whitespace
    const cleanData = {
      employeeId: employeeId.trim(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      department: department.trim()
    };

    // Validate email format
    if (!isValidEmail(cleanData.email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Validate fullName length
    if (cleanData.fullName.length < 2 || cleanData.fullName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Full Name must be between 2 and 100 characters"
      });
    }

    // Check if employee with same ID exists
    const existingEmployee = await Employee.findOne({
      where: {
        [Op.or]: [
          { employeeId: cleanData.employeeId },
          { email: cleanData.email }
        ]
      }
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: existingEmployee.employeeId === cleanData.employeeId
          ? "Employee ID already exists"
          : "Email already exists"
      });
    }

    const employee = await Employee.create(cleanData);

    return res.status(201).json({
      success: true,
      message: "Employee added successfully",
      data: employee
    });

  } catch (error) {
    next(error);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees
    });

  } catch (error) {
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required"
      });
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee
    });

  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required"
      });
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    await employee.destroy();

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};