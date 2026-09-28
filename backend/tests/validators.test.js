const { validateRegistrationInput } = require('../src/utils/validators');

describe('validateRegistrationInput', () => {
  test('chấp nhận dữ liệu hợp lệ', () => {
    expect(validateRegistrationInput({
      email: 'person@example.com',
      password: 'password123',
      fullName: 'Test User',
    })).toBeNull();
  });

  test('từ chối thiếu email', () => {
    expect(validateRegistrationInput({ password: 'password123', fullName: 'Test User' }))
      .toBe('Email là bắt buộc');
  });

  test('từ chối mật khẩu ngắn', () => {
    expect(validateRegistrationInput({
      email: 'person@example.com',
      password: 'short',
      fullName: 'Test User',
    })).toBe('Mật khẩu phải có ít nhất 8 ký tự');
  });
});