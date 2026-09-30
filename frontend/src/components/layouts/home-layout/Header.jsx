import { useState } from 'react';
import {
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Star,
  User,
} from 'lucide-react';

const topLinks = [
  { label: 'Giới thiệu', href: '#gioi-thieu' }
];

const navigation = [
  { label: 'Sản phẩm', href: '#san-pham' },
  { label: 'Phòng', href: '#phong' },
  { label: 'Thiết kế nội thất', href: 'interior-design' }
];

const IconButton = ({ label, icon: Icon }) => (
  <button
    type="button"
    aria-label={label}
    className="text-stone-500 transition-colors hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
  >
    <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
  </button>
);

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white text-stone-800" id="trang-chu">
      {/* Thanh trên cùng */}
      <div className="flex h-[52px] items-center justify-between border-b border-stone-100 px-5 text-[13px] lg:px-[4vw]">
        <div className="flex items-center gap-8">
          <button type="button" className="flex items-center gap-1.5 text-stone-400" aria-label="Ngôn ngữ: Tiếng Việt">
            <span className="grid size-4 place-items-center rounded-full bg-red-600 text-yellow-300">
              <Star className="size-2.5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            </span>
            VN
          </button>

          <a href="tel:0969011078" className="flex items-center gap-1.5 font-bold text-black">
            <Phone className="size-4" strokeWidth={1.8} aria-hidden="true" />
            096 9011 078
          </a>

          <nav className="hidden items-center gap-4 md:flex" aria-label="Liên kết phụ">
            {topLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  link.highlight
                    ? 'text-red-600 hover:text-red-700'
                    : 'text-stone-500 hover:text-stone-900'
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-5 sm:flex">
            <IconButton label="Cửa hàng gần bạn" icon={MapPin} />
            <IconButton label="Yêu thích" icon={Heart} />
            <IconButton label="Giỏ hàng" icon={ShoppingBag} />
          </div>

          <a href="/login" className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900">
            Đăng nhập
            <User className="size-4 text-stone-500" fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Thanh điều hướng chính */}
      <div className="flex h-[88px] items-center gap-6 px-5 lg:gap-10 lg:px-[4vw]">
        <button
          type="button"
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="shrink-0 text-stone-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
        >
          <Menu className="size-9" strokeWidth={1.5} aria-hidden="true" />
        </button>

        <a
          href="/home"
          aria-label="Góc Nhà, về trang chủ"
          className="shrink-0 border border-stone-500 px-2.5 py-1 font-sans text-[34px] font-light leading-none tracking-tight text-stone-500"
        >
          góc nhà
        </a>

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-1 whitespace-nowrap text-[15px] uppercase tracking-wide text-stone-800 transition-colors hover:text-orange-700"
            >
              {item.label}
              {item.dropdown && <ChevronDown className="size-3.5 text-stone-500" aria-hidden="true" />}
            </a>
          ))}
        </nav>

        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="ml-auto flex h-10 w-full max-w-[272px] items-center rounded-full border border-stone-200 bg-stone-50 pl-6 pr-3"
        >
          <input
            type="search"
            placeholder="Tìm sản phẩm"
            aria-label="Tìm sản phẩm"
            className="w-full bg-transparent text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none"
          />
          <button type="submit" aria-label="Tìm kiếm" className="text-stone-900">
            <Search className="size-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Menu di động / khi thu gọn */}
      {menuOpen && (
        <nav className="border-t border-stone-100 px-5 py-3 xl:hidden" aria-label="Menu di động">
          <ul className="grid gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center justify-between py-2 text-sm uppercase tracking-wide text-stone-800 hover:text-orange-700"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="size-3.5 text-stone-500" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}