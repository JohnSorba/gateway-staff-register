import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../main";
import AttendanceForm from "./AttendanceForm";
import Alert from "./Utilities/Alert";

function AttendanceList() {
  const [attendance, setAttendance] = useState([]);
  //   const [addAttendanceModal, setAddAttendanceModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchStaffAttendance();
  }, []);

  const fetchStaffAttendance = async () => {
    try {
      const response = await axios.get(`${baseURL}/attendance/all-attendance`);
      console.log(response.data);

      setAttendance(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="container">
      <h1>Daily Attendance List</h1>
      <h2>
        Attendance for today{": "}
        {new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </h2>
      <button
        className="heading-btn button btn-black"
        onClick={handleShowModal}
      >
        Add Attendance
      </button>
      {attendance.length < 1 ? (
        <p>No Record Added for Today!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Staff Name</th>
              {/* <th>Date</th> */}
              <th>Status</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((attendance, i) => {
              {
                /* const formattedDate = new Date(
                attendance.date
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }); */
              }
              const formattedTimeIn = new Date(
                `1970-01-01T${attendance.time_in}`
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              const formattedTimeOut = new Date(
                `1970-01-01T${attendance.time_out}`
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <tr key={attendance.staff_id}>
                  <td>{i + 1}</td>
                  <td>
                    {attendance.first_name} {attendance.last_name}
                  </td>
                  {/* <td>{formattedDate}</td> */}
                  <td>{attendance.attendance_status}</td>
                  <td>{formattedTimeIn}</td>
                  <td>
                    {formattedTimeOut === "Invalid Date"
                      ? "-"
                      : formattedTimeOut}
                  </td>
                  <td>{attendance.comments}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {showAddModal && (
        <>
          <div className="modal-backdrop"></div>
          <div className="modal">
            <AttendanceForm
              onShowAlert={setShowAlert}
              onShowModal={showAddModal}
              onSetShowModal={setShowAddModal}
              onSetMessage={setMessage}
              onSetType={setType}
              onCloseModal={handleCloseModal}
              onSubmitRefresh={fetchStaffAttendance}
            />
          </div>
        </>
      )}

      <Alert
        type={type}
        message={message}
        onClose={handleCloseAlert}
        isVisible={showAlert}
      />
    </div>
  );
}

export default AttendanceList;
