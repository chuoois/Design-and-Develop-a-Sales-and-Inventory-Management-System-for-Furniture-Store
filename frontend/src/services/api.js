import axios from 'axios';

// Instance axios dùng chung cho toàn app, base URL lấy từ biến môi trường Vite
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export default api;
