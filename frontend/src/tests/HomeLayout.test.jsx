import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomeLayout from '../components/layouts/home-layout/HomeLayout';

describe('HomeLayout', () => {
  it('renders the header, matched route content, and footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<h1>Nội dung trang</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Nội dung trang' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tạo tài khoản' })).toHaveAttribute('href', '/register');
  });
});