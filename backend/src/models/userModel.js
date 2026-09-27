// Model chứa các câu truy vấn SQL liên quan tới bảng users
const { pool } = require('../config/db');

async function createUser({ name, email, avatarUrl }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, avatar_url) VALUES (?, ?, ?)',
    [name, email, avatarUrl]
  );
  return { id: result.insertId, name, email, avatarUrl };
}

async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0];
}

async function getAllUsers() {
  const [rows] = await pool.query('SELECT id, name, email, avatar_url, created_at FROM users ORDER BY id DESC');
  return rows;
}

module.exports = { createUser, findUserByEmail, getAllUsers };
