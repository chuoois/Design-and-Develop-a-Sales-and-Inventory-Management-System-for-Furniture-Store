import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-emerald-950">
      <Header />
      <main className="w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}