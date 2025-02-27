import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (req, res) => {
  try {
    console.log("Cloudinary config:", cloudinary.config());  // Debug log

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};