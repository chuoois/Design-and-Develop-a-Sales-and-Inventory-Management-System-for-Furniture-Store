// Cấu hình kết nối MySQL bằng connection pool (tái sử dụng connection, tránh mở/đóng liên tục)
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Hàm kiểm tra kết nối DB khi server khởi động
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Kết nối MySQL thành công');
    conn.release();
  } catch (err) {
    console.error('❌ Kết nối MySQL thất bại:', err.message);
  }
}

module.exports = { pool, testConnection };
