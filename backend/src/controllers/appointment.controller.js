import Appointment from "../models/Appointment.js";
import Notification from "../models/Notification.js";
import DoctorProfile from "../models/DoctorProfile.js";
/**
 * PATIENT → Book Appointment
 */
export const bookAppointment = async (req, res) => {
  const { doctorId, date, time, reason } = req.body;

  if (!doctorId || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor: doctorId,
    date,
    time,
    reason
  });

  // 🔔 NOTIFY DOCTOR
  await Notification.create({
    user: doctorId,
    title: "New Appointment Request",
    message: "A patient has booked an appointment."
  });

  res.status(201).json({
    message: "Appointment booked successfully",
    appointment
  });
};

/**
 * DOCTOR → View My Appointments
 */
export const getDoctorAppointments = async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.user._id })
    .populate("patient", "name email")
    .sort({ createdAt: -1 });

  res.json(appointments);
};

/**
 * PATIENT → View My Appointments
 */
export const getPatientAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    patient: req.user._id
  })
    .populate("doctor", "name")
    .sort({ createdAt: -1 });

  // 👇 MANUALLY ATTACH DOCTOR PROFILE
  const appointmentsWithProfile = await Promise.all(
    appointments.map(async (a) => {
      const profile = await DoctorProfile.findOne({
        user: a.doctor._id
      });

      return {
        ...a.toObject(),
        doctorProfile: profile
      };
    })
  );

  res.json(appointmentsWithProfile);
};

/**
 * DOCTOR → Approve / Reject Appointment
 */
export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (appointment.doctor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  appointment.status = status;
  await appointment.save();

  // 🔔 NOTIFY PATIENT
  await Notification.create({
    user: appointment.patient,
    title: "Appointment Update",
    message: `Your appointment has been ${status.toLowerCase()}.`
  });

  res.json({
    message: `Appointment ${status.toLowerCase()}`,
    appointment
  });
};
