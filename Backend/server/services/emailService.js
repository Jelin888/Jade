import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"EduJade" <${config.email.user}>`,
    to,
    subject,
    text,
    html,
  };
  return await transporter.sendMail(mailOptions);
};
