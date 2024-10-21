/* eslint-disable react/prop-types */
import axios from "axios";
import { baseURL } from "../main";

function AddStaffForm({
  onShowAlert,
  onSetMessage,
  onSetType,
  onCloseModal,
  formData,
  setFormData,
  onSetId,
}) {
  console.log("form Data: ", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/staff/add`, {
        formData,
      });
      console.log(formData);

      onCloseModal();
      onSetMessage(response.data.message);
      onSetType(response.data.type);
      onSetId(response.data.staffId);
      onShowAlert(true);
    } catch (error) {
      console.error("Error submitting form", error.response.data.error);
      onSetType(error.response.data.type);
      onSetMessage(error.response.data.error);
      onShowAlert(true);
      onCloseModal();
    }
  };

  return (
    <div>
      <div className="modal-backdrop"></div>
      <div className="modal">
        Add Staff Member
        <form className="form">
          <div className="form-group">
            {" "}
            {/* First Name */}
            <article>
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                placeholder="Enter First Name..."
                className="form-input"
                onChange={handleChange}
              />
            </article>
            {/* Last Name */}
            <article>
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                placeholder="Enter Last Name..."
                className="form-input"
                onChange={handleChange}
              />
            </article>
          </div>

          <div className="form-group">
            {/* Department */}
            <article>
              <label className="form-label" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" disabled>
                  --Select Department--
                </option>
                <option value="Admin">Admin</option>
                <option value="Teachers">Teachers</option>
                <option value="Auxiliary">Auxiliary</option>
              </select>
            </article>

            {/* Position */}
            <article>
              <label className="form-label" htmlFor="position">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                placeholder="Enter Position..."
                className="form-input"
                onChange={handleChange}
              />
            </article>
          </div>

          <div className="form-group">
            {/* Email*/}
            <article>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Enter Email..."
                className="form-input"
                onChange={handleChange}
              />
            </article>

            {/* Phone */}
            <article>
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                placeholder="Enter Phone..."
                className="form-input"
                onChange={handleChange}
              />
            </article>
          </div>

          {/* Address */}
          <article>
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <input
              type="textarea"
              id="address"
              name="address"
              value={formData.address}
              placeholder="Enter Address..."
              className="form-input"
              onChange={handleChange}
            />
          </article>

          <div className="form-group">
            <button className="form-button" onClick={handleSubmit}>
              Add Staff
            </button>
            <button className="form-button" onClick={onCloseModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStaffForm;
