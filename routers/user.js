const express = require("express");
const { Signup, Login } = require("../controllers/user");
const validateUeserSignup = require("../validator/user");

const router = express.Router();

router.post("/login", Login);
router.post("/signup",validateUeserSignup, Signup);

module.exports = router;
