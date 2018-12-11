import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = (payload) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: payload.email,
    subject: 'iReporter information',
    text: ` Hi ${payload.firstname}, Your record's status has been changed to ${payload.status}`,
  };
  return transporter.sendMail(mailOptions);
};

export default sendMail;
