// Controller xử lý logic cho API user: tạo user + upload avatar + gửi mail chào mừng
const userModel = require('../models/userModel');
const { sendWelcomeEmail } = require('../services/mailService');
const { isValidEmail } = require('../utils/validators');

// POST /api/users
// Luồng: nhận form-data (name, email, avatar file) -> multer upload lên Cloudinary
// -> lưu thông tin + url ảnh vào MySQL -> gửi mail chào mừng
async function createUser(req, res) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Thiếu name hoặc email' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Email không hợp lệ' });
    }

    const existing = await userModel.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email đã tồn tại' });
    }

    // req.file được multer-storage-cloudinary gắn vào sau khi upload thành công
    const avatarUrl = req.file ? req.file.path : null;

    const user = await userModel.createUser({ name, email, avatarUrl });

    // Gửi mail chào mừng (không chặn response nếu gửi mail lỗi)
    sendWelcomeEmail(email, name).catch((err) =>
      console.error('Gửi mail thất bại:', err.message)
    );

    return res.status(201).json({ message: 'Tạo user thành công', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}

async function listUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    return res.json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}

module.exports = { createUser, listUsers };
