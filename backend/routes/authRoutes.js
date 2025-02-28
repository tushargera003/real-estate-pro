import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin verification route
router.get("/is-admin", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ isAdmin: user?.isAdmin || false });
  } catch (error) {
    res.status(500).json({ isAdmin: false });
  }
});

// User authentication check (for checkout page)
router.get("/verify-user", protect, async (req, res) => {
  res.json({ isAuthenticated: true });
});

export default router;
