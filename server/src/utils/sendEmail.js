import nodemailer from "nodemailer";

const sendEmail = async(options) =>{
    // configure smtp transporter (Using gmail or ethereal for testing)
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, //App-specific password
        },
    });

    const message = {
        from: `${process.env.FROM_NAME || "DocBook clinic"} <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    await transporter.sendMail(message);
};

export default sendEmail;