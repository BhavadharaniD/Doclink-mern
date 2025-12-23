import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  uploadMedicalRecord,
  getMyRecords
} from "../controllers/medicalRecord.controller.js";

const router = express.Router();

router.post("/upload", authMiddleware, uploadMedicalRecord);
router.get("/my", authMiddleware, getMyRecords);

export default router;
