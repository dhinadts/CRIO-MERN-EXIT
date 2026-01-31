const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Nodemailer connection failed:", error);
    } else {
        console.log("Nodemailer ready to send emails");
    }
});

module.exports = transporter;
