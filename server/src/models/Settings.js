import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      required: true,
      default: "DocBook Executive Clinics",
    },
    supportEmail: {
      type: String,
      required: true,
      default: "ops@docbook.com",
    },
    slotDuration: {
      type: String,
      required: true,
      enum: ["10", "15", "20", "30"],
      default: "15",
    },
    maxBufferDays: {
      type: String,
      required: true,
      enum: ["15", "30", "60", "90"],
      default: "30",
    },
    enableReminders: {
      type: Boolean,
      default: true,
    },
    autoApproveInsurance: {
      type: Boolean,
      default: false,
    },
    systemStatus: {
      type: String,
      default: "Operational",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);
