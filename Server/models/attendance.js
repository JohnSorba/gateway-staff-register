const pool = require("../db");

const AttendanceModel = {
  // get all attendance
  async getAttendance() {
    const today = new Date().toISOString().slice(0, 10);
    try {
      const query =
        "SELECT a.*, s.first_name, s.last_name FROM attendance a JOIN staff s ON s.staff_id = a.staff_id where date = $1 order by time_in";
      const result = await pool.query(query, [today]);

      return result.rows;
    } catch (error) {
      console.error(error);
    }
  },

  // add staff member
  async addAttendance(staffId, status, date, timeIn, timeOut, comments) {
    try {
      const checkIfIDExists = await pool.query(
        "SELECT * FROM staff WHERE staff_id = $1",
        [staffId]
      );

      if (checkIfIDExists.rows.length == 0) {
        return {
          type: "failure",
          message: "Invalid Staff ID! Please Enter the Correct ID.",
        };
      }

      const checkIfStaffExists = await pool.query(
        "SELECT * FROM attendance WHERE staff_id = $1 AND date = $2",
        [staffId, date]
      );

      if (checkIfStaffExists.rows.length > 0) {
        // Staff already has an attendance record for today
        const existingAttendance = checkIfStaffExists.rows[0];

        if (!existingAttendance.time_out) {
          // Update time_out if it's not already set
          const newTimeOut = new Date().toLocaleTimeString();
          const query = "UPDATE attendance SET time_out = $1 WHERE id = $2";
          await pool.query(query, [newTimeOut, existingAttendance.id]);
          return { type: "success", message: "Time Out added!" };
        } else {
          // Both time in and time out are already set
          return {
            type: "failure",
            message: "Attendance already recorded for today",
          };
        }
      } else {
        // Create a new attendance record
      }
      const query =
        "INSERT INTO attendance(staff_id, attendance_status, date, time_in, time_out, comments) VALUES($1, $2, $3, $4, $5, $6)";

      await pool.query(query, [
        staffId,
        status,
        date,
        timeIn,
        timeOut,
        comments,
      ]);

      return { type: "success", message: "Attendance Record Created!" };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { AttendanceModel };
