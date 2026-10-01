import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';

/* ---------- Dữ liệu mẫu (thay bằng store/context giỏ hàng thật) ---------- */
const initialItems = [
  { id: 1, name: 'Armchair Bubble', price: 19400000, qty: 1, image: '' },
  { id: 9, name: 'Bình Trang Trí Ab9029', price: 1500000, qty: 2, image: '' },
];

const formatVnd = (n) => `${n.toLocaleString('en-US')} VND`;

/* ---------- Thành phần ---------- */
const Photo = ({ src, alt, className = '' }) =>
  src ? (
    <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  ) : (
    <div className={`bg-stone-100 ${className}`} role="img" aria-label={alt} />
  );

const PageBanner = ({ title }) => (
  <section className="relative isolate flex min-h-[180px] items-end overflow-hidden bg-stone-400 md:h-[16vw] md:max-h-[340px]" aria-labelledby="cart-title">
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
    <div className="px-5 pb-8 text-white lg:px-[4vw]">
      <h1 id="cart-title" className="text-3xl font-light md:text-4xl">{title}</h1>
      <nav aria-label="Breadcrumb" className="mt-3 flex items-center gap-2 text-xs">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <span aria-hidden="true" className="text-white/70">/</span>
        <span aria-current="page" className="font-bold">{title}</span>
      </nav>
    </div>
  </section>
);

const QtyStepper = ({ name, value, onChange }) => {
  const btn =
    'grid size-8 place-items-center text-stone-800 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900';
  return (
    <div className="inline-flex items-center border border-stone-300" role="group" aria-label={`Số lượng ${name}`}>
      <button type="button" className={btn} disabled={value <= 1} onClick={() => onChange(value - 1)} aria-label="Giảm số lượng">
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span className="grid h-8 min-w-9 place-items-center text-[13px] font-bold text-stone-900" aria-live="polite">{value}</span>
      <button type="button" className={btn} disabled={value >= 99} onClick={() => onChange(value + 1)} aria-label="Tăng số lượng">
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
};

const CartItem = ({ item, onQty, onRemove }) => (
  <li className="grid grid-cols-[88px_1fr] gap-4 border-b border-stone-200 py-6 sm:grid-cols-[110px_1fr_auto] sm:items-center sm:gap-6">
    <Photo src={item.image} alt={item.name} className="aspect-square w-full" />

    <div className="min-w-0">
      <h2 className="text-[13px] font-bold text-stone-900">{item.name}</h2>
      <p className="mt-2 text-[12px] font-medium text-stone-600">{formatVnd(item.price)}</p>
      <div className="mt-4 flex items-center gap-4">
        <QtyStepper name={item.name} value={item.qty} onChange={(q) => onQty(item.id, q)} />
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="inline-flex items-center gap-1 text-[12px] font-medium text-stone-500 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
          aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
        >
          <X className="size-3.5" aria-hidden="true" />
          Xóa
        </button>
      </div>
    </div>

    <p className="col-span-2 text-right text-[13px] font-bold text-stone-900 sm:col-span-1 sm:min-w-[130px]">
      {formatVnd(item.price * item.qty)}
    </p>
  </li>
);

const EmptyCart = () => (
  <section className="mx-auto max-w-[560px] px-5 py-24 text-center" aria-live="polite">
    <h2 className="text-xl font-normal text-stone-900">Giỏ hàng của bạn đang trống</h2>
    <p className="mt-3 text-[13px] font-medium text-stone-600">Hãy chọn vài sản phẩm bạn yêu thích để bắt đầu.</p>
    <Link
      to="/products"
      className="mt-8 inline-flex h-11 items-center bg-[#323139] px-8 text-xs font-bold uppercase text-white transition-colors hover:bg-[#232226] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#323139]"
    >
      Xem sản phẩm
    </Link>
  </section>
);

/* ---------- Trang Giỏ hàng (route con của HomeLayout) ---------- */
export const CartPage = () => {
  const [items, setItems] = useState(initialItems);

  const setQty = (id, qty) =>
    setItems((list) => list.map((it) => (it.id === id ? { ...it, qty: Math.min(99, Math.max(1, qty)) } : it)));
  const remove = (id) => setItems((list) => list.filter((it) => it.id !== id));

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((n, it) => n + it.qty, 0),
      subtotal: items.reduce((sum, it) => sum + it.price * it.qty, 0),
    }),
    [items]
  );

  return (
    <>
      <PageBanner title="Giỏ hàng" />

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mx-auto grid max-w-[1305px] gap-10 px-5 py-12 lg:grid-cols-[1fr_360px] lg:gap-14">
          <section aria-label="Sản phẩm trong giỏ hàng">
            <div className="flex items-baseline justify-between border-b border-stone-900 pb-3">
              <h2 className="text-[14px] font-bold uppercase tracking-wide text-stone-900">Sản phẩm ({count})</h2>
              <Link to="/products" className="text-[12px] font-bold text-stone-900 hover:text-orange-700">
                Tiếp tục mua sắm
              </Link>
            </div>
            <ul>
              {items.map((it) => (
                <CartItem key={it.id} item={it} onQty={setQty} onRemove={remove} />
              ))}
            </ul>
          </section>

          <aside className="h-fit bg-stone-100 p-6 lg:sticky lg:top-6" aria-label="Tóm tắt đơn hàng">
            <h2 className="text-[14px] font-bold uppercase tracking-wide text-stone-900">Tóm tắt đơn hàng</h2>
            <span className="mt-3 block h-px w-6 bg-stone-500" aria-hidden="true" />

            <dl className="mt-6 grid gap-3 text-[13px] font-medium text-stone-800">
              <div className="flex justify-between gap-4">
                <dt>Tạm tính</dt>
                <dd className="font-bold">{formatVnd(subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Phí vận chuyển</dt>
                <dd className="text-stone-600">Tính khi thanh toán</dd>
              </div>
              <div className="mt-2 flex justify-between gap-4 border-t border-stone-300 pt-4 text-[15px]">
                <dt className="font-bold text-stone-900">Tổng cộng</dt>
                <dd className="font-bold text-stone-900">{formatVnd(subtotal)}</dd>
              </div>
            </dl>

            <Link
              to="/thanh-toan"
              className="mt-6 flex h-11 w-full items-center justify-center bg-[#232226] text-xs font-bold uppercase text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#232226]"
            >
              Thanh toán
            </Link>
            <p className="mt-4 text-[11px] font-medium leading-5 text-stone-600">
              Cần hỗ trợ đặt hàng? Gọi{' '}
              <a href="tel:0969011078" className="font-bold text-stone-900 hover:text-orange-700">096 9011 078</a>.
            </p>
          </aside>
        </div>
      )}
    </>
  );
};