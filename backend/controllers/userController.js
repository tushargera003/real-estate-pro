import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: "User exists" });

  const user = await User.create({ name, email, password });
  user ? res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) })
       : res.status(400).json({ message: "Invalid user data" });
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
