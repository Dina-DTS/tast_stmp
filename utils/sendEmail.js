import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async ({ name, email, phone, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 1️⃣ الإيميل اللي هيروح للشركة
  const companyMailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Message',
    html: `
      <h2 style="color: #333;">📩 Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  // 2️⃣ الإيميل اللي هيروح للمستخدم كـ تأكيد
  const confirmationMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '📬 We Received Your Message',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f7f9; max-width: 600px; margin: auto; border-radius: 8px; border: 1px solid #ddd;">
        <div style="text-align: center;">
          <img src="https://www.yourlogo.com/logo.png" alt="Your Logo" style="width: 150px; margin-bottom: 20px;" />
        </div>
        <h2 style="color: #333;">Thank you for contacting us, ${name}!</h2>
        <p style="font-size: 1.1em;">We’ve received your message and will get back to you shortly. Here’s a summary of what you sent:</p>
        <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
          <p><strong>📧 Email:</strong> ${email}</p>
          <p><strong>📱 Phone:</strong> ${phone}</p>
          <p><strong>📝 Message:</strong><br>${message}</p>
        </div>
        <p style="font-size: 0.9em; color: #777; margin-top: 20px;">If you have any questions, feel free to reply to this email.</p>
        <br />
        <p style="font-size: 0.9em; color: #777;">– The Team</p>
      </div>
    `,
  };

  // إرسال الإيميلين
  await transporter.sendMail(companyMailOptions);
  await transporter.sendMail(confirmationMailOptions);
};

export default sendEmail;
