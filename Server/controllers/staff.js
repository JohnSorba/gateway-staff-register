const { StaffModel } = require("../models/staff");

const StaffController = {
  // add staff member
  async getAllStaff(req, res) {
    try {
      const response = await StaffModel.getAllStaff();

      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ type: "failure", error: "Internal Server Error!" });
    }
  },

  // add staff member
  async addStaff(req, res) {
    const { formData } = req.body;

    console.log("first name: ", formData.firstName);
    console.log("first name: ", formData.department);

    try {
      const addStaff = await StaffModel.addStaff(
        formData.firstName,
        formData.lastName,
        formData.department,
        formData.position,
        formData.email,
        formData.phone,
        formData.address
      );

      res.status(200).json(addStaff);
    } catch (error) {
      res
        .status(500)
        .json({ type: "failure", error: "Failed to add Staff Record!" });
    }
  },
};

module.exports = { StaffController };
