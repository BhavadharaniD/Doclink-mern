import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointmentStatus
} from "../controllers/appointment.controller.js";

const router = express.Router();

/**
 * PATIENT ROUTES
 */
router.post(
  "/book",
  authMiddleware,
  roleMiddleware("PATIENT"),
  bookAppointment
);

router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("PATIENT"),
  getPatientAppointments
);

/**
 * DOCTOR ROUTES
 */
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getDoctorAppointments
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  updateAppointmentStatus
);

export default router;
