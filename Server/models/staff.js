const pool = require("../db");

const StaffModel = {
  // get all staff
  async getAllStaff() {
    try {
      const query = "SELECT * FROM staff";
      const { rows } = await pool.query(query);

      return rows;
    } catch (error) {
      throw error;
    }
  },

  // add staff member
  async addStaff(
    firstName,
    lastName,
    department,
    position,
    email,
    phone,
    address
  ) {
    function generateStaffId() {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let staffId = "";
      for (let i = 0; i < 6; i++) {
        staffId += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return staffId;
    }

    const staffId = generateStaffId();
    console.log(staffId);

    // return {
    //   message: "Added Successfully!",
    //   type: "success",
    //   staffId,
    // };

    try {
      const query =
        "INSERT INTO staff(staff_id, first_name, last_name, department, position, email, phone, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";

      await pool.query(query, [
        staffId,
        firstName,
        lastName,
        department,
        position,
        email,
        phone,
        address,
      ]);

      return { type: "success", message: "Staff Record Created!", staffId };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { StaffModel };
