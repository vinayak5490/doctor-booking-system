import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    qualification: {
      type: String,
      required: true,
      default: "MBBS, MD",
    },
    specialization: {
      type: String,
      required: true,
      default: "General Physician",
    },
    experience: {
      type: Number,
      required: true,
      default: 10, //years
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 500,
    },
    languages: {
      type: [String],
      default: ["English", "Hindi"],
    },
    clinicAddress: {
      type: String,
      default: "Central Health Complex, New Delhi",
    },
    about: {
      type: String,
      default:
        "A compassionate physician dedicated to preventive care, accurate diagnosis, and patient-centered treatment.",
    },
    workingDays: {
      type: [String],
      default: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    startTime: {
      type: String,
      default: "09:00 AM",
    },
    endTime: {
      type: String,
      default: "05:00 PM",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
