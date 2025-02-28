import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// ✅ Secure Token Generation (Only using DB isAdmin)
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ✅ User Registration (isAdmin will always be false for new users)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, phone });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin, // ✅ Taken from DB, not request
        token: generateToken(user._id, user.isAdmin), // ✅ Securely included
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ User Authentication (Always fetch isAdmin from DB)
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({ message: "Account locked. Try again later." });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.isAdmin),
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};


// ✅ Fetch All Users (Admin Only)
export const getUsers = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access Denied" }); // ❌ Unauthorized request
    }

    const users = await User.find().select("-password"); // ✅ Hide password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete User (Admin Only)
export const deleteUser = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access Denied" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
