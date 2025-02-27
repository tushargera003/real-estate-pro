import express from "express";
import Newsletter from "../models/Newsletter.js";

const router = express.Router();

// POST Route to Subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if email already exists
    const existingUser = await Newsletter.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Save to DB
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
