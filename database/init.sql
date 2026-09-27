-- File này tự động chạy khi container MySQL khởi tạo lần đầu (mount vào /docker-entrypoint-initdb.d)
CREATE DATABASE IF NOT EXISTS db_2026_fssims;
USE db_2026_fssims;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  avatar_url VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
