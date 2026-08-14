import nodemailer from "nodemailer";

// Create a single, pooled transporter to reuse connections and reduce latency
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  // secure should be true for port 465, otherwise false for STARTTLS
  secure: process.env.EMAIL_SECURE === "true",
});

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"DocBook Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${to}:`, info.response);
  return info;
};

export default sendEmail;
