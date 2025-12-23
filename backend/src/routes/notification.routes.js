import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { getMyNotifications,markAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get(
  "/my",
  authMiddleware,
  getMyNotifications
);
router.patch(
  "/:id/read",
  authMiddleware,
  markAsRead
);

export default router;
