const request = require('supertest');

// Mock middleware upload: bỏ qua upload Cloudinary thật, giả lập next() luôn
jest.mock('../src/middlewares/uploadMiddleware', () => ({
  single: () => (req, res, next) => next(),
}));

// Mock model: không cần kết nối MySQL thật khi chạy unit test
jest.mock('../src/models/userModel', () => ({
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
  getAllUsers: jest.fn(),
}));

// Mock mailService: không gửi mail thật khi test
jest.mock('../src/services/mailService', () => ({
  sendWelcomeEmail: jest.fn().mockResolvedValue(true),
  sendMail: jest.fn().mockResolvedValue(true),
}));

const userModel = require('../src/models/userModel');
const app = require('../src/app');

describe('POST /api/users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('trả về 400 khi thiếu name hoặc email', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Thinh' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Thiếu/);
  });

  test('trả về 400 khi email không hợp lệ', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Thinh', email: 'invalid-email' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/không hợp lệ/);
  });

  test('trả về 409 khi email đã tồn tại', async () => {
    userModel.findUserByEmail.mockResolvedValue({ id: 1, email: 'exist@example.com' });

    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Thinh', email: 'exist@example.com' });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/đã tồn tại/);
  });

  test('tạo user thành công trả về 201', async () => {
    userModel.findUserByEmail.mockResolvedValue(undefined);
    userModel.createUser.mockResolvedValue({
      id: 1,
      name: 'Thinh',
      email: 'thinh@example.com',
      avatarUrl: null,
    });

    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Thinh', email: 'thinh@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('thinh@example.com');
    expect(userModel.createUser).toHaveBeenCalledTimes(1);
  });
});

describe('GET /api/users', () => {
  test('trả về danh sách user', async () => {
    userModel.getAllUsers.mockResolvedValue([
      { id: 1, name: 'A', email: 'a@example.com' },
    ]);

    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBe(1);
  });
});
