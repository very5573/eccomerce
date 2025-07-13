// 📁 backend/utils/sendEmail.js
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log("📨 Creating transporter...");

  // ✅ YAHI PAR YEH LOG DAALO:
  console.log("📨 ENV CHECK:", {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_MAIL: process.env.SMTP_MAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  });

  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Carbon Store" <${process.env.SMTP_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  console.log("✉️ MAIL OPTIONS:", mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent successfully.");
  } catch (error) {
    console.error("❌ Mail error:", error);
    throw error;
  }
};

module.exports = sendEmail;
