import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    specialization: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true
    },
    hospital: {
      type: String
    },
    bio: {
      type: String
    },
    rating: {
  type: Number,
  default: 4.5
},
consultationFee: {
  type: Number,
  default: 500
},
availableDays: {
  type: [String],
  default: ["Mon", "Wed", "Fri"]
},
availableTime: {
  type: String,
  default: "10:00 AM - 4:00 PM"
},

  
  },
  { timestamps: true }
);

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);
export default DoctorProfile;
