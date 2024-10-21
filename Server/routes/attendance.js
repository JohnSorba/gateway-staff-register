const Router = require("express");
const router = Router();

const { AttendanceController } = require("../controllers/attendance");

// get all attendance
router.get("/all-attendance", AttendanceController.getAllAttendance);

// add attendance
router.post("/add", AttendanceController.addAttendance);

// check attendance status
router.post("/check-status/:staffId", AttendanceController.checkAttendance);

module.exports = router;
