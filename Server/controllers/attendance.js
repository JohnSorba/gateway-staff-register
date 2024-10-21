const { AttendanceModel } = require("../models/attendance");

const AttendanceController = {
  // get all attendance
  async getAllAttendance(req, res) {
    try {
      const getAttendance = await AttendanceModel.getAttendance();

      res.status(200).json(getAttendance);
    } catch (error) {
      res
        .status(500)
        .json({ type: "failure", error: "Internal Server Error!" });
    }
  },

  // check staff attendance
  async checkAttendance(req, res) {
    const staffId = req.params;

    console.log("staff id: ", staffId);

    try {
      const checkStaffAttendance = await AttendanceModel.checkStaffAttendance(
        staffId
      );

      res.status(200).json(checkStaffAttendance);
    } catch (error) {
      res
        .status(500)
        .json({ type: "failure", error: "Failed to add Staff Record!" });
    }
  },

  // add Attendance
  async addAttendance(req, res) {
    const { staffId, status, date, timeIn, timeOut, comments } = req.body;

    console.log("staff id and time: ", staffId, date, timeIn);

    try {
      const addAttendance = await AttendanceModel.addAttendance(
        staffId,
        status,
        date,
        timeIn,
        timeOut,
        comments
      );

      res.status(200).json(addAttendance);
    } catch (error) {
      res
        .status(500)
        .json({ type: "failure", error: "Internal Server Error!" });
    }
  },
};

module.exports = { AttendanceController };
