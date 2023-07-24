const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
exports.Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(409).json({ massege: "Email is already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    const result = await user.save();
    const token = jwt.sign(
      {
        id: result._id,
        email: email,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    return res.status(201).json({
      message: "user created",
      user: result,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist) {
      return res.status(409).json({ massege: "Email doesn't exist" });
    }
    const isPassworCorrect = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if (!isPassworCorrect) {
      return res.status(202).json({ massege: "password doesn't correct" });
    }

    const token = jwt.sign(
      {
        id: isEmailExist._id,
        email: isEmailExist.email,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    return res.status(201).json({
      token: token,
      result: isEmailExist,
    });
  } catch (error) {
    console.log(error);
  }
};
