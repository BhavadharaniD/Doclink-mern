import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMessagesByAppointment, getRecentChats } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/recent", authMiddleware, getRecentChats);
router.get("/:appointmentId", authMiddleware, getMessagesByAppointment);

export default router;
