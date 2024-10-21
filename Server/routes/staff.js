const Router = require("express");
const router = Router();

const { StaffController } = require("../controllers/staff");

// add staff member
router.post("/add", StaffController.addStaff);

// get all staff
router.get("/get-staff", StaffController.getAllStaff);

module.exports = router;
