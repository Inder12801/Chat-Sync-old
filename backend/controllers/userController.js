// const UserModel = require("../modals/userModel");
// const expressAsyncHandler = require("express-async-handler");
import { encryptPassword } from "../config/encryptPassword.js";
import { generateToken } from "../config/generateToken.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// Login
const loginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Invalid credentials");
    } else {
      // compare passwords
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).send("Invalid Password");
      } else {
        res.status(201);
        res.json({
          name: user.name,
          email: user.email,
          pic: user.pic,
          _id: user._id,
          token: generateToken(user._id),
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// Registration
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // check for all fields
  if (!name || !email || !password) {
    res.send(400);
    throw Error("All necessary input fields have not been filled");
  }

  // pre-existing user
  const userExist = await User.findOne({ email });
  if (userExist) {
    // res.send(405);
    throw new Error("User already Exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create an entry in the db
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic.toString(),
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration Error");
  }
});

const allUsers = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
    .find({
      _id: { $ne: req.user._id },
    })
    .select("-password");
  res.send(users);
});

export { loginController, registerController, allUsers };
