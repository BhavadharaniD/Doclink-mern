import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
  createPrescription,
  getPatientPrescriptions,
  getDoctorPrescriptions
} from "../controllers/prescription.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  createPrescription
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("PATIENT"),
  getPatientPrescriptions
);
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getDoctorPrescriptions
);

export default router;
