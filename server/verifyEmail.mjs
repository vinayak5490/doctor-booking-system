import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log('EMAIL_USER=', process.env.EMAIL_USER);
console.log('EMAIL_PASS length=', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

transporter.verify((err, success) => {
  if (err) {
    console.error('SMTP verify failed:', err);
    process.exit(1);
  } else {
    console.log('SMTP verified:', success);
    process.exit(0);
  }
});
