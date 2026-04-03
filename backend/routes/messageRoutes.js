import express from "express";
import protect from "../middleware/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

// send
router.post("/", protect, sendMessage);

// get chat
router.get("/:userId", protect, getMessages);

export default router;