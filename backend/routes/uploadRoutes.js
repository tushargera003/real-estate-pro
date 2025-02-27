import express from "express";
import { uploadFile } from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

export default router;
