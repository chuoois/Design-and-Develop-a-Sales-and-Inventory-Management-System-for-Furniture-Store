const { isValidEmail } = require('../src/utils/validators');

describe('validators - isValidEmail', () => {
  test('trả về true với email hợp lệ', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@sub.domain.com')).toBe(true);
  });

  test('trả về false với email không hợp lệ', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
  });

  test('trả về false khi input rỗng hoặc không phải string', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail(12345)).toBe(false);
  });
});
