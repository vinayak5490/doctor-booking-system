import Settings from "../models/Settings.js";

const allowedFields = [
  "clinicName",
  "supportEmail",
  "slotDuration",
  "maxBufferDays",
  "enableReminders",
  "autoApproveInsurance",
  "systemStatus",
];

const normalizeSettingsPayload = (body = {}) => {
  const payload = {};

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  }

  if (payload.clinicName !== undefined) {
    payload.clinicName = String(payload.clinicName).trim();
  }

  if (payload.supportEmail !== undefined) {
    payload.supportEmail = String(payload.supportEmail).trim().toLowerCase();
  }

  if (payload.systemStatus !== undefined) {
    payload.systemStatus = String(payload.systemStatus).trim();
  }

  if (payload.enableReminders !== undefined) {
    payload.enableReminders = Boolean(payload.enableReminders);
  }

  if (payload.autoApproveInsurance !== undefined) {
    payload.autoApproveInsurance = Boolean(payload.autoApproveInsurance);
  }

  return payload;
};

// GET /api/settings - Fetch existing configuration or seed default
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        clinicName: "DocBook Executive Clinics",
        supportEmail: "ops@docbook.com",
        slotDuration: "15",
        maxBufferDays: "30",
        enableReminders: true,
        autoApproveInsurance: false,
        systemStatus: "Operational",
      });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/settings - Update system configuration
export const updateSettings = async (req, res) => {
  try {
    const payload = normalizeSettingsPayload(req.body);

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: payload },
      { upsert: true, new: true, runValidators: true },
    );

    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
