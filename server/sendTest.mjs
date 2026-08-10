import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: `"DocBook Support" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  subject: 'DocBook SMTP Send Test',
  html: '<p>This is a test of the email pipeline.</p>',
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('SendMail error:', err);
    process.exit(1);
  } else {
    console.log('SendMail success:', info.response);
    process.exit(0);
  }
});
