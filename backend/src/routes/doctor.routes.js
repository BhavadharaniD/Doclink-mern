import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
   getMyDoctorProfile,
  updateMyDoctorProfile,
  getAllDoctors
} from "../controllers/doctor.controller.js";

const router = express.Router();

// 👨‍⚕️ Doctor creates/updates profile
router.put(
  "/me",
  authMiddleware,
  roleMiddleware("DOCTOR"),
 updateMyDoctorProfile
);

// 🧑 Patient views doctors
router.get(
  "/",
  authMiddleware,
  roleMiddleware("PATIENT"),
  getAllDoctors
);

router.get(
  "/me",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getMyDoctorProfile
);
export default router;
