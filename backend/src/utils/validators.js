// Hàm kiểm tra định dạng email hợp lệ (tách riêng khỏi controller để dễ unit test)
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = { isValidEmail };
