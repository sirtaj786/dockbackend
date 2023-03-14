const express = require("express");
const userModel = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

// User Register
userRouter.post("/register", async (req, res) => {
  const {name, email, password } = req.body;
  
  await bcrypt.hash(password, 6, function (err, hash) {
    if (err) {
      res.send("Please try again");
    }
    const user = new userModel({
      name,
      email,
      password: hash,
    });
    user.save();
    res.send("SignUp Successfull ");
  });
});

// User Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({email});
  
  if (!user) {
    return res.send("User not Found");
  }
  
  const hash = user.password;

  const userId = user._id;
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      var token = jwt.sign({ email, userId }, process.env.SECRET_KEY);
      return res.send({ message: "Login Successfull", token: token,email:email,userId:userId });
      
    } else {
      res.send("Invalid Credentials");

    }
  });
});

module.exports = userRouter;