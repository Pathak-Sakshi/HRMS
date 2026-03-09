const Employee = require("../models/employee.model");
const Attendance = require("../models/attendance.model");
const { Op } = require("sequelize");

exports.getDashboard = async (req, res, next) => {
  try {
    // Total employees count
    const totalEmployees = await Employee.count();

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);

    // Present count for today
    const presentToday = await Attendance.count({
      where: {
        date: today,
        status: "Present"
      }
    });

    // Absent count for today
    const absentToday = await Attendance.count({
      where: {
        date: today,
        status: "Absent"
      }
    });

    // Employees not marked for today
    const notMarkedToday = totalEmployees - (presentToday + absentToday);

    // Get last 7 days attendance data for chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().slice(0, 10);

    const last7DaysAttendance = await Attendance.findAll({
      where: {
        date: {
          [Op.gte]: sevenDaysAgoStr,
          [Op.lte]: today
        }
      },
      attributes: ["date", "status"],
      raw: true
    });

    // Group by date and count
    const attendanceByDate = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().slice(0, 10);
      attendanceByDate[dateStr] = { present: 0, absent: 0 };
    }

    last7DaysAttendance.forEach(record => {
      if (attendanceByDate[record.date]) {
        if (record.status === "Present") {
          attendanceByDate[record.date].present += 1;
        } else {
          attendanceByDate[record.date].absent += 1;
        }
      }
    });

   
 

    return res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: {
        totalEmployees,
        presentToday,
        absentToday,
        notMarkedToday,
        last7DaysAttendance: attendanceByDate,
        
      }
    });

  } catch (error) {
    next(error);
  }
};