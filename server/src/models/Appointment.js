import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      sparse: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    Symptoms: {
      type: String,
      trim: true,
      default: "",
    },
    doctor: {
      type: String,
      required: true,
      default: "Dr. Arjun Mehta",
    },
    date: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

// Pre-validate hook to generate readable Booking Identifiers if not present
appointmentSchema.pre("validate", function (next) {
  if (!this.bookingId) {
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit token
    this.bookingId = `APT-${uniqueSuffix}`;
  }
  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;