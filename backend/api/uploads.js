import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

// File Upload Route
router.post("/uploads", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "services",
    });

    res.json({ url: result.secure_url }); // Return the file URL
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "File upload failed" });
  }
});

export default router;