const { Attendance, Employee } = require("../models");
const { Op } = require("sequelize");

// Validate date format (YYYY-MM-DD)
const isValidDateFormat = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

exports.markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;

    // Validate required fields
    if (!employeeId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (employeeId, date, status)"
      });
    }

    // Validate date format
    if (!isValidDateFormat(date)) {
      return res.status(400).json({
        success: false,
        message: "Date must be in YYYY-MM-DD format"
      });
    }

    // Validate status
    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'Present' or 'Absent'"
      });
    }

    // Check if employee exists
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    // Check if attendance already marked for this date
    const existingRecord = await Attendance.findOne({
      where: {
        employee_id: employeeId,
        date: date
      }
    });

    if (existingRecord) {
      return res.status(409).json({
        success: false,
        message: "Attendance already marked for this employee on this date"
      });
    }

   // Check if date is not in future
const attendanceDate = new Date(date + "T00:00:00");
const today = new Date();

attendanceDate.setHours(0,0,0,0);
today.setHours(0,0,0,0);

if (attendanceDate.getTime() > today.getTime()) {
  return res.status(400).json({
    success: false,
    message: "Cannot mark attendance for future dates"
  });
}

    const record = await Attendance.create({
      employee_id: employeeId,
      date: date,
      status: status
    });

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: record
    });

  } catch (error) {
    next(error);
  }
};

exports.getAttendance = async (req, res, next) => {
  try {
    const { date, employeeId } = req.query;
    const where = {};

    // Date filter
    if (date) {
      if (!isValidDateFormat(date)) {
        return res.status(400).json({
          success: false,
          message: "Date must be in YYYY-MM-DD format"
        });
      }
      where.date = date;
    }

    // Employee filter
    if (employeeId) {
      where.employee_id = employeeId;
    }

    const records = await Attendance.findAll({
      where,
      include: {
        model: Employee,
        attributes: ["id", "employeeId", "fullName", "email", "department"]
      },
      order: [["date", "DESC"]],
      limit: 1000
    });

    return res.status(200).json({
      success: true,
      message: "Attendance records retrieved successfully",
      data: records
    });

  } catch (error) {
    next(error);
  }
};

exports.getAttendanceByEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required"
      });
    }

    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    const records = await Attendance.findAll({
      where: { employee_id: employeeId },
      include: {
        model: Employee,
        attributes: ["id", "employeeId", "fullName", "email", "department"]
      },
      order: [["date", "DESC"]]
    });

    const totalPresent = records.filter(r => r.status === "Present").length;
    const totalAbsent = records.filter(r => r.status === "Absent").length;

    return res.status(200).json({
      success: true,
      message: "Attendance retrieved successfully",
      data: {
        employee: employee,
        records: records,
        summary: {
          totalPresent,
          totalAbsent,
          totalDays: records.length
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

exports.getAttendanceSummary = async (req, res, next) => {
  try {
    const summary = await Employee.findAll({
      attributes: ["id", "employeeId", "fullName"],
      include: {
        model: Attendance,
        attributes: [],
        required: false
      },
      raw: false
    });

    const attendanceSummary = await Promise.all(
      summary.map(async (emp) => {
        const records = await Attendance.findAll({
          where: { employee_id: emp.id }
        });
        const totalPresent = records.filter(r => r.status === "Present").length;
        const totalAbsent = records.filter(r => r.status === "Absent").length;

        return {
          employeeId: emp.id,
          employeeCode: emp.employeeId,
          fullName: emp.fullName,
          totalPresent,
          totalAbsent,
          totalDays: records.length
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Attendance summary retrieved successfully",
      data: attendanceSummary
    });

  } catch (error) {
    next(error);
  }
};