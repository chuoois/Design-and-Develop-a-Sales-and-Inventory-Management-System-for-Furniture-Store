const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route kiểm tra server sống
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend đang chạy' });
});

app.use('/api/users', userRoutes);

// Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Đã có lỗi xảy ra', error: err.message });
});

module.exports = app;
