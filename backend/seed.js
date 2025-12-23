import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./src/models/User.js";
import DoctorProfile from "./src/models/DoctorProfile.js";
import Appointment from "./src/models/Appointment.js";
import Prescription from "./src/models/Prescription.js";
import MedicalRecord from "./src/models/MedicalRecord.js";
import Notification from "./src/models/Notification.js";

dotenv.config();

/* ---------------- CONNECT DB ---------------- */
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB connected");

/* ---------------- CLEAR OLD DATA ---------------- */
await Promise.all([
  User.deleteMany(),
  DoctorProfile.deleteMany(),
  Appointment.deleteMany(),
  Prescription.deleteMany(),
  MedicalRecord.deleteMany(),
  Notification.deleteMany()
]);

console.log("🧹 Old data cleared");

/* ---------------- USERS ---------------- */
const doctor1 = await User.create({
  name: "Dr Arun",
  email: "arun@doclink.com",
  password: "123456",
  role: "DOCTOR"
});

const doctor2 = await User.create({
  name: "Dr Meena",
  email: "meena@doclink.com",
  password: "123456",
  role: "DOCTOR"
});

const doctor3 = await User.create({
  name: "Dr Ravi",
  email: "ravi@doclink.com",
  password: "123456",
  role: "DOCTOR"
});

const patient1 = await User.create({
  name: "Kumar",
  email: "kumar@doclink.com",
  password: "123456",
  role: "PATIENT"
});

console.log("👥 Users created");

/* ---------------- DOCTOR PROFILES ---------------- */
await DoctorProfile.insertMany([
  {
    user: doctor1._id,
    specialization: "Cardiologist",
    experience: 12,
    hospital: "Apollo Hospital",
    bio: "Heart specialist with 12 years experience",
    rating: 4.8,
    consultationFee: 800,
    availableDays: ["Mon", "Wed", "Fri"],
    availableTime: "10:00 AM - 1:00 PM"
  },
  {
    user: doctor2._id,
    specialization: "Dermatologist",
    experience: 8,
    hospital: "Care Skin Clinic",
    bio: "Skin & cosmetic treatment expert",
    rating: 4.6,
    consultationFee: 600,
    availableDays: ["Tue", "Thu", "Sat"],
    availableTime: "11:00 AM - 3:00 PM"
  },
  {
    user: doctor3._id,
    specialization: "General Physician",
    experience: 15,
    hospital: "City Health Centre",
    bio: "General health & chronic illness expert",
    rating: 4.7,
    consultationFee: 500,
    availableDays: ["Mon", "Tue", "Thu"],
    availableTime: "9:00 AM - 12:00 PM"
  }
]);

console.log("👨‍⚕️ Doctor profiles created");

/* ---------------- DATE HELPERS ---------------- */
const today = new Date();
const todayDate = today.toISOString().split("T")[0];

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 3);

const pastDate = new Date();
pastDate.setDate(pastDate.getDate() - 5);

/* ---------------- APPOINTMENTS ---------------- */

// ✅ TODAY APPOINTMENT (THIS FIXES YOUR ISSUE)
const todayAppointment = await Appointment.create({
  patient: patient1._id,
  doctor: doctor3._id, // Ravi
  date: todayDate,
  time: "10:30 AM",
  reason: "Follow-up checkup",
  status: "APPROVED"
});

// ✅ UPCOMING APPOINTMENT
const upcomingAppointment = await Appointment.create({
  patient: patient1._id,
  doctor: doctor1._id, // Arun
  date: futureDate.toISOString().split("T")[0],
  time: "11:00 AM",
  reason: "Chest pain",
  status: "APPROVED"
});

// ✅ PAST APPOINTMENT
const pastAppointment = await Appointment.create({
  patient: patient1._id,
  doctor: doctor2._id, // Meena
  date: pastDate.toISOString().split("T")[0],
  time: "04:30 PM",
  reason: "Skin allergy",
  status: "APPROVED"
});

// ✅ PENDING REQUEST
await Appointment.create({
  patient: patient1._id,
  doctor: doctor3._id, // Ravi
  date: futureDate.toISOString().split("T")[0],
  time: "09:30 AM",
  reason: "General checkup",
  status: "PENDING"
});

console.log("📅 Appointments created");


/* ---------------- PRESCRIPTION (PAST) ---------------- */
await Prescription.create({
  appointment: pastAppointment._id,
  doctor: doctor2._id,
  patient: patient1._id,
  medicines: [
    { name: "Cetirizine", dosage: "1 tablet", duration: "5 days" }
  ],
  notes: "Avoid dust and apply moisturizer."
});

/* ---------------- MEDICAL RECORD ---------------- */
await MedicalRecord.create({
  patient: patient1._id,
  uploadedBy: doctor2._id,
  title: "Allergy Test Report",
  fileUrl: "https://dummyimage.com/600x400/allergy-report.jpg",
  appointment: pastAppointment._id
});

/* ---------------- NOTIFICATIONS ---------------- */
await Notification.insertMany([
  {
    user: patient1._id,
    title: "Appointment Approved",
    message: "Your upcoming appointment has been approved."
  },
  {
    user: patient1._id,
    title: "Prescription Added",
    message: "Your prescription from last visit is available."
  },
  {
    user: doctor3._id,
    title: "New Appointment Request",
    message: "You have a new pending appointment."
  }
]);

console.log("🌱 DATABASE SEEDED SUCCESSFULLY");
process.exit();
