const express = require("express");
const {
  GetEmployees,
  AddEmployee,
  GetEmployeeById,
  UpdateAllEmployeeById,
  UpdateEmployeeById,
  DeleteEmployee,
} = require("../controllers/employee");
const upload = require("../middleware/upload");
const validateEmployee = require("../validator/empoylee");
const router = express.Router();
const CheckAuth = require("../middleware/checkAuth");
const checkAuth = require("../middleware/checkAuth");
router.get("/", GetEmployees);
router.get("/:id", GetEmployeeById);
router.post(
  "/",
  CheckAuth,
  upload.single("employeeImage"),
  validateEmployee,
  AddEmployee
);
router.put(
  "/:id",
  CheckAuth,
  upload.single("employeeImage"),
  UpdateAllEmployeeById
);
router.patch("/:id", checkAuth, UpdateEmployeeById);
router.delete("/:id", CheckAuth, DeleteEmployee);

module.exports = router;
