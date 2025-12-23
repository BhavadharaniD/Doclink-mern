import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import medicalRecordRoutes from "./routes/medicalRecord.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import messageRoutes from "./routes/message.route.js";
const app = express();
app.use(express.json());



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use("/messages", messageRoutes);
app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/records", medicalRecordRoutes);
app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Doclink API running 🚀" });
});

export default app;
