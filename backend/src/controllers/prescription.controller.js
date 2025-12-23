import Prescription from "../models/Prescription.js";
import Appointment from "../models/Appointment.js";



// Patient views prescriptions
export const getPatientPrescriptions = async (req, res) => {
  const prescriptions = await Prescription.find({ patient: req.user._id })
    .populate("doctor", "name")
    .populate("appointment");

  res.json(prescriptions);
};
export const createPrescription = async (req, res) => {
  const { appointmentId, medicines, notes } = req.body;

  if (!appointmentId || !medicines?.length) {
    return res.status(400).json({ message: "Missing data" });
  }

  const prescription = await Prescription.create({
    appointment: appointmentId,
    doctor: req.user._id,
    patient: req.body.patientId,
    medicines,
    notes
  });
     await Notification.create({
    user: patientId,
    title: "Prescription Added",
    message: "Your prescription is now available."
  });

  res.status(201).json(prescription);
};
export const getDoctorPrescriptions = async (req, res) => {
  const prescriptions = await Prescription.find({
    doctor: req.user._id
  })
    .populate("patient", "name")
    .populate("appointment", "date time reason")
    .sort({ createdAt: -1 });

  res.json(prescriptions);
};
