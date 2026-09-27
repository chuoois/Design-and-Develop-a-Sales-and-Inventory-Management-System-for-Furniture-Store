// Service gửi email dùng Nodemailer + Gmail App Password
const nodemailer = require('nodemailer');
require('dotenv').config();

// Tạo transporter kết nối tới Gmail SMTP
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // App Password (không dùng mật khẩu Gmail thường)
  },
});

// Gửi mail chào mừng khi user đăng ký thành công
async function sendWelcomeEmail(toEmail, userName) {
  const mailOptions = {
    from: `"App Team" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: 'Chào mừng bạn đến với hệ thống!',
    html: `
      <h2>Xin chào ${userName},</h2>
      <p>Cảm ơn bạn đã đăng ký tài khoản. Chúc bạn có trải nghiệm tốt!</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

// Hàm gửi mail tổng quát, tái sử dụng cho các trường hợp khác (quên mật khẩu, thông báo...)
async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: `"App Team" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
}

module.exports = { sendWelcomeEmail, sendMail };
