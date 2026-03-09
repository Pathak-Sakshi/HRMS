const router = require("express").Router();
const controller = require("../controllers/attendance.controller");

router.post("/", controller.markAttendance);
router.get("/", controller.getAttendance);
router.get("/employee/:employeeId", controller.getAttendanceByEmployee);
router.get("/summary/all", controller.getAttendanceSummary);

module.exports = router;