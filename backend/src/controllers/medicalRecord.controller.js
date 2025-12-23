import MedicalRecord from "../models/MedicalRecord.js";

// Upload record (Doctor or Patient)
export const uploadMedicalRecord = async (req, res) => {
  const { patientId, title, fileUrl, appointmentId } = req.body;

  const record = await MedicalRecord.create({
    patient: patientId,
    uploadedBy: req.user._id,
    title,
    fileUrl,
    appointment: appointmentId
  });

  res.status(201).json({
    message: "Medical record uploaded",
    record
  });
};

// Patient views own records
export const getMyRecords = async (req, res) => {
  const records = await MedicalRecord.find({ patient: req.user._id })
    .populate("uploadedBy", "name role");

  res.json(records);
};
