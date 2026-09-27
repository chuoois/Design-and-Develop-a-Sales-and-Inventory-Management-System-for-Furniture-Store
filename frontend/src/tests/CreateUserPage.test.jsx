import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateUserPage from '../pages/CreateUserPage';
import api from '../services/api';

// Mock module gọi API để test không cần backend thật
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('CreateUserPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render đầy đủ các trường trong form', () => {
    render(<CreateUserPage />);
    expect(screen.getByText(/Tạo User Mới/i)).toBeInTheDocument();
    expect(screen.getByText(/Tên:/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tạo user/i })).toBeInTheDocument();
  });

  test('gửi form thành công hiển thị thông báo', async () => {
    api.post.mockResolvedValueOnce({
      data: { user: { name: 'Thinh' } },
    });

    render(<CreateUserPage />);
    const user = userEvent.setup();

    const inputs = document.querySelectorAll('input');
    await user.type(inputs[0], 'Thinh'); // input tên
    await user.type(inputs[1], 'thinh@example.com'); // input email

    await user.click(screen.getByRole('button', { name: /Tạo user/i }));

    await waitFor(() => {
      expect(screen.getByText(/Tạo thành công user: Thinh/i)).toBeInTheDocument();
    });
    expect(api.post).toHaveBeenCalledTimes(1);
  });

  test('gửi form thất bại hiển thị thông báo lỗi', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { message: 'Email đã tồn tại' } },
    });

    render(<CreateUserPage />);
    const user = userEvent.setup();

    const inputs = document.querySelectorAll('input');
    await user.type(inputs[0], 'Thinh');
    await user.type(inputs[1], 'thinh@example.com');

    await user.click(screen.getByRole('button', { name: /Tạo user/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email đã tồn tại/i)).toBeInTheDocument();
    });
  });
});
