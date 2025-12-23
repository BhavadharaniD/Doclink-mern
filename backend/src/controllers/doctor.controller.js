import DoctorProfile from "../models/DoctorProfile.js";

// Create or Update Doctor Profile
export const getMyDoctorProfile = async (req, res) => {
  const profile = await DoctorProfile.findOne({
    user: req.user._id
  });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(profile);
};

export const updateMyDoctorProfile = async (req, res) => {
  const {
    bio,
    availableDays,
    availableTime,
    consultationFee
  } = req.body;

  const profile = await DoctorProfile.findOne({
    user: req.user._id
  });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  profile.bio = bio ?? profile.bio;
  profile.availableDays = availableDays ?? profile.availableDays;
  profile.availableTime = availableTime ?? profile.availableTime;
  profile.consultationFee = consultationFee ?? profile.consultationFee;

  await profile.save();

  res.json({
    message: "Profile updated successfully",
    profile
  });
};
// Get All Doctors (for patients)
export const getAllDoctors = async (req, res) => {
  const doctors = await DoctorProfile.find()
    .populate("user", "name email");

  res.json(doctors);
};
