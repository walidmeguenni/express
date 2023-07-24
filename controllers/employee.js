const Employee = require("../models/Employee");
const fs = require("fs");
exports.GetEmployees = async (req, res) => {
  try {
    const result = await Employee.find();

    res.status(200).json({
      message: "list of Employees",
      Employees: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.AddEmployee = async (req, res) => {
  try {
    const { firstName, lastName, age, salary, role, email } = req.body;
    const employee = new Employee({
      firstName,
      lastName,
      age,
      salary,
      role,
      email,
      employeeImage: req.file.path,
    });
    const result = await employee.save();
    res.status(201).json({
      message: "Employee saved",
      Employee: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Employee.findById(id);
    res.status(200).json({
      Employee: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateAllEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(400).json({ message: "employee doesn't exist" });
    }
    const path = employee.employeeImage;
    fs.unlink(path, async () => {
      const { firstName, lastName, age, salary, role, email } = req.body;
      const result = await Employee.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          age,
          salary,
          role,
          email,
          employeeImage: req.file.path,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Employee updated",
        Employee: result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.UpdateEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, company, quantity } = req.body;

    const updatedEmployee = {};
    if (name) updatedEmployee.name = name;
    if (price) updatedEmployee.price = price;
    if (company) updatedEmployee.company = company;
    if (quantity) updatedEmployee.quantity = quantity;
    const result = await Employee.findByIdAndUpdate(id, updatedEmployee, {
      new: true,
    });

    res.status(200).json({
      message: "Employee updated",
      Employee: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(400).json({ message: "employee doesn't exist" });
    }
    const path = employee.employeeImage;

    fs.unlink(path, async () => {
      const result = await Employee.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Employee deleted",
        Employee: result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
