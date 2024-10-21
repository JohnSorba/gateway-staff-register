import axios from "axios";
import { useEffect, useState } from "react";
import AddStaffForm from "./AddStaffForm";
import { baseURL } from "../main";
import Alert from "./Utilities/Alert";

const staffDetails = {
  firstName: "",
  lastName: "",
  department: "",
  position: "",
  email: "",
  phone: "",
  address: "",
};

function StaffList() {
  const [staff, setStaff] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(staffDetails);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`${baseURL}/staff/get-staff`);
        console.log(response.data);

        setStaff(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStaff();
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1>Staff List</h1>
      <button
        className="heading-btn button btn-black"
        onClick={() => setShowModal(true)}
      >
        Add New Staff
      </button>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Phone</th>
            {/* <th>Email</th> */}
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staff, i) => (
            <tr key={staff.staff_id}>
              <td>{i + 1}</td>
              <td>{staff.staff_id}</td>
              <td>
                {staff.first_name} {staff.last_name}
              </td>
              <td>{staff.department}</td>
              <td>{staff.position}</td>
              <td>{staff.phone}</td>
              {/* <td>{staff.email}</td> */}
              <td>{staff.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <>
          {" "}
          <AddStaffForm
            onShowAlert={setShowAlert}
            message={message}
            onSetMessage={setMessage}
            onSetType={setType}
            onCloseModal={handleCloseModal}
            formData={formData}
            setFormData={setFormData}
            onSetId={setId}
          />
        </>
      )}

      <Alert
        type={type}
        message={message}
        onClose={handleCloseAlert}
        isVisible={showAlert}
        attendanceID={id}
      />
    </div>
  );
}

export default StaffList;
