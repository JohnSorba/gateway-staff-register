/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../main";

function AttendanceForm({
  onSetShowModal,
  onShowAlert,
  onSetMessage,
  onSetType,
  onCloseModal,
  onSubmitRefresh,
}) {
  const [staffId, setStaffId] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState(null);

  console.log(attendanceStatus);
  console.log("staff id : ", staffId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current date and time
    const date = new Date();
    // const time = date.toLocaleTimeString();

    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Determine comment based on time in
    let comment = "";
    const timeInDate = new Date(`1970-01-01T${time}`);
    const lateTime = new Date(`1970-01-01T08:00:00`);
    const absentTime = new Date(`1970-01-01T10:00:00`);

    if (timeInDate >= lateTime && timeInDate < absentTime) {
      comment = "Late";
    } else if (timeInDate >= absentTime) {
      comment = "Absent";
    } else {
      comment = "Early";
    }

    // send data to server
    try {
      const response = await axios.post(`${baseURL}/attendance/add`, {
        staffId,
        status: "present",
        date: date.toISOString().slice(0, 10),
        timeIn: time,
        timeOut: null,
        comments: comment,
      });

      console.log(response.data);

      setAttendanceStatus(response.message);
      onSetMessage(response.data.message);
      onSetType(response.data.type);
      onShowAlert(true);
      onCloseModal();
      onSubmitRefresh();
    } catch (error) {
      setAttendanceStatus(null);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="staffId" className="attendance-input-label">
        Staff Attendance ID:
      </label>
      <input
        type="text"
        id="staffId"
        name="staffId"
        value={staffId}
        onChange={(e) => setStaffId(e.target.value)}
        required
        placeholder="Enter Your Attendance Code..."
        className="form-input"
      />

      {/* {attendanceStatus === null && (
        <button onClick={handleClockIn}>Clock In</button>
      )}
      {attendanceStatus &&
        attendanceStatus.time_in &&
        !attendanceStatus.time_out && (
          <button onClick={handleClockOut}>Clock Out</button>
        )}
      {attendanceStatus &&
        attendanceStatus.time_in &&
        attendanceStatus.time_out && <p>Attendance already recorded.</p>} */}

      <div className="form-group">
        <button className="form-button" type="submit">
          Submit
        </button>
        <button
          className="form-button cancel"
          onClick={() => onSetShowModal(false)}
        >
          Cancel
        </button>
      </div>
      <p>{attendanceStatus}</p>
    </form>
  );
}

export default AttendanceForm;
