import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';

const HOTLINE = { label: '096 9011 078', tel: '0969011078' };

const primaryBtn =
  'inline-flex h-11 items-center justify-center gap-2 bg-[#323139] px-6 text-xs font-bold uppercase text-white transition-colors hover:bg-[#232226] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#323139]';
const secondaryBtn =
  'inline-flex h-11 items-center justify-center gap-2 border border-[#323139] px-6 text-xs font-bold uppercase text-[#323139] transition-colors hover:bg-[#323139] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#323139]';

/* Khung chung cho cả 3 trang (không nằm trong HomeLayout) */
const ErrorLayout = ({ code, title, description, children }) => (
  <div className="flex min-h-screen flex-col bg-stone-50 text-stone-800">
    <header className="flex h-[88px] items-center px-5 lg:px-[4vw]">
      <Link
        to="/"
        aria-label="Góc Nhà, về trang chủ"
        className="border border-stone-500 px-2.5 py-1 text-[34px] font-light leading-none tracking-tight text-stone-500"
      >
        góc nhà
      </Link>
    </header>

    <main className="grid flex-1 md:grid-cols-2">
      {/* Mã lỗi */}
      <div className="flex min-h-[220px] items-center justify-center bg-[#232226] px-5 md:order-2 md:min-h-0">
        <p
          aria-hidden="true"
          className="select-none text-[34vw] font-light leading-none tracking-tight text-white/90 md:text-[16vw]"
        >
          {code}
        </p>
      </div>

      {/* Nội dung */}
      <div className="flex items-center px-5 py-14 md:order-1 lg:px-[6vw]">
        <div className="max-w-[460px]">
          <p className="text-sm font-bold tracking-wide text-orange-700">LỖI {code}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{title}</h1>
          <span className="mt-5 block h-px w-6 bg-stone-500" aria-hidden="true" />
          <p className="mt-5 text-sm font-medium leading-6 text-stone-700">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">{children}</div>
        </div>
      </div>
    </main>

    <footer className="bg-[#323139] px-5 py-5 text-[11px] font-medium text-stone-300 lg:px-[4vw]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p>© 2021 – Bản quyền của Góc Nhà – thương hiệu thuộc AKA Furniture</p>
        <a href={`tel:${HOTLINE.tel}`} className="inline-flex items-center gap-1.5 font-bold text-white hover:text-stone-300">
          <Phone className="size-3.5" aria-hidden="true" />
          Hotline: {HOTLINE.label}
        </a>
      </div>
    </footer>
  </div>
);

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(-1)} className={secondaryBtn}>
      <ArrowLeft className="size-4" aria-hidden="true" />
      Quay lại
    </button>
  );
};

/* ---------- 404 ---------- */
export const NotFoundPage = () => (
  <ErrorLayout
    code="404"
    title="Không tìm thấy trang"
    description="Trang bạn đang tìm có thể đã bị xoá, đổi tên hoặc tạm thời không truy cập được. Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ."
  >
    <Link to="/" className={primaryBtn}>Về trang chủ</Link>
    <Link to="/san-pham" className={secondaryBtn}>Xem sản phẩm</Link>
  </ErrorLayout>
);

/* ---------- 401 ---------- */
export const UnauthorizedPage = () => (
  <ErrorLayout
    code="401"
    title="Bạn chưa đăng nhập"
    description="Vui lòng đăng nhập để tiếp tục truy cập nội dung này. Nếu phiên làm việc đã hết hạn, hãy đăng nhập lại."
  >
    <Link to="/login" className={primaryBtn}>Đăng nhập</Link>
    <Link to="/" className={secondaryBtn}>Về trang chủ</Link>
  </ErrorLayout>
);

/* ---------- 403 ---------- */
export const ForbiddenPage = () => (
  <ErrorLayout
    code="403"
    title="Không có quyền truy cập"
    description="Tài khoản của bạn không có quyền xem trang này. Nếu bạn cho rằng đây là nhầm lẫn, hãy liên hệ Góc Nhà để được hỗ trợ."
  >
    <Link to="/" className={primaryBtn}>Về trang chủ</Link>
    <BackButton />
  </ErrorLayout>
);