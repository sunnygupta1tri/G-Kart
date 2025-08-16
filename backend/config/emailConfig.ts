import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email is ready to send:', success);
  }
});

const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: `Your G-Kart <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendVerificationEmail = async (to: string, token: string) => {
  const subject = 'Email Verification - G-Kart';
  const text = `Please verify your email by clicking on the following link: \n\n ${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await sendEmail(to, subject, text);
};

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const subject = 'Password Reset - G-Kart';
  const text = `You can reset your password by clicking on the following link: \n\n ${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await sendEmail(to, subject, text);
};
export default transporter;
