import express from "express";
import { submitContactForm ,getAllContactMessages} from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", submitContactForm);
router.get("/getAllContactMessages", getAllContactMessages);
export default router;
