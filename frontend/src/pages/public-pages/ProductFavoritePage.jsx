import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Heart } from 'lucide-react';

/* ---------- Dữ liệu mẫu (thay bằng API; image: URL ảnh Sản phẩm yêu thích) ---------- */
const banner = { title: 'Sản phẩm yêu thích', image: '' };
const PAGE_SIZE = 8;

const sortOptions = [
  { value: 'asc', label: 'Theo giá: Thấp đến cao' },
  { value: 'desc', label: 'Theo giá: Cao đến thấp' }
];

const products = [
  { id: 1, name: 'Armchair Bubble', price: 19400000, isNew: true, image: '' },
  { id: 2, name: 'Armchair Flow Green', price: 13900001, isNew: true, image: '' },
  { id: 3, name: 'Armchair Jupiter', price: 18990000, isNew: true, image: '' },
  { id: 4, name: 'Armchair Luster', price: 55900000, isNew: true, image: '' },
  { id: 5, name: 'Bình Trang Trí Ab5060 D8X7Xh29.5 Sm', price: 5500000, image: '' },
  { id: 6, name: 'Bình Trang Trí Ab5063 D10X9Xh23 Sm', price: 5500000, image: '' },
  { id: 7, name: 'Bình Trang Trí Ab9009', price: 1100001, image: '' },
  { id: 8, name: 'Bình Trang Trí Ab9010', price: 1100001, image: '' },
  { id: 9, name: 'Bình Trang Trí Ab9029', price: 1500000, image: '' },
  { id: 10, name: 'Bình Trang Trí Ac20039 D16Xt12Xh38 Sm', price: 5500000, image: '' },
  { id: 11, name: 'Bình Trang Trí Ac30039', price: 5500000, image: '' },
  { id: 12, name: 'Bình Trang Trí Ac30040', price: 4500000, image: '' },
];

const formatVnd = (n) => `${n.toLocaleString('en-US')} VND`;

/* Trả về dãy số trang kèm dấu '…' (vd: 1 2 3 4 … 16 17 18) */
const getPages = (current, total) => {
  if (total <= 8) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, '…', total - 2, total - 1, total];
  if (current >= total - 3) return [1, 2, 3, '…', total - 3, total - 2, total - 1, total];
  return [1, '…', current - 1, current, current + 1, '…', total];
};

/* ---------- Thành phần ---------- */
const Photo = ({ src, alt, className = '' }) =>
  src ? (
    <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  ) : (
    <div className={`bg-stone-100 ${className}`} role="img" aria-label={alt} />
  );

const NewBadge = () => (
  <span
    className="inline-block bg-red-600 px-1.5 pb-2 pt-1 text-[10px] font-extrabold leading-none text-white"
    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)' }}
  >
    NEW
  </span>
);

const Banner = () => (
  <section className="relative isolate flex min-h-[220px] items-end overflow-hidden bg-stone-400 md:h-[25.5vw] md:max-h-[520px]" aria-labelledby="sp-title">
    {banner.image && <img src={banner.image} alt="" className="absolute inset-0 -z-20 size-full object-cover" />}
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
    <div className="px-5 pb-10 text-white lg:px-[4vw]">
      <h1 id="sp-title" className="text-3xl font-light md:text-4xl">{banner.title}</h1>
      <nav aria-label="Breadcrumb" className="mt-4 flex items-center gap-2 text-xs">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span aria-hidden="true" className="text-white/70">/</span>
        <span aria-current="page" className="font-bold">Sản phẩm yêu thích</span>
      </nav>
    </div>
  </section>
);

const FilterBar = ({ value, onChange, onApply }) => (
  <div className="mx-auto flex max-w-[1305px] items-end justify-between gap-4 px-5 pt-12">
    <div className="w-full max-w-[265px]">
      <label htmlFor="sort-price" className="block text-[13px] text-stone-700">Giá</label>
      <div className="relative mt-2 border-b border-stone-700">
        <select
          id="sort-price"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent py-2 pr-6 text-[13px] text-stone-900 focus:outline-none"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-stone-800" aria-hidden="true" />
      </div>
    </div>

    <button
      type="button"
      onClick={onApply}
      className="h-10 bg-[#232226] px-5 text-sm font-medium uppercase text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#232226]"
    >
      Áp dụng
    </button>
  </div>
);

const ProductCard = ({ product, liked, onToggle }) => (
  <article className="group relative flex flex-col">
    <div className="absolute right-2 top-2 z-10 flex items-start gap-2">
      {product.isNew && <NewBadge />}
      <button
        type="button"
        onClick={() => onToggle(product.id)}
        aria-pressed={liked}
        aria-label={`Yêu thích ${product.name}`}
        className="text-stone-600 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
      >
        <Heart className="size-4" strokeWidth={1.6} fill={liked ? '#dc2626' : 'none'} stroke={liked ? '#dc2626' : 'currentColor'} aria-hidden="true" />
      </button>
    </div>
    <a href={`/san-pham/${product.id}`} className="flex flex-col">
      <Photo
        src={product.image}
        alt={product.name}
        className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <h2 className="mt-5 text-[13px] font-bold text-stone-900">{product.name}</h2>
      <p className="mt-4 text-[11px] font-bold text-stone-800">{formatVnd(product.price)}</p>
    </a>
  </article>
);

const boxCls =
  'grid size-[38px] place-items-center border border-stone-800 text-[15px] font-bold text-stone-900 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900';

const Pagination = ({ page, total, onChange }) => {
  if (total <= 1) return null;
  return (
    <nav aria-label="Phân trang" className="mt-14 flex flex-wrap items-center justify-center gap-1.5">
      {getPages(page, total).map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} aria-hidden="true" className="grid size-[38px] place-items-center rounded-full border border-stone-800 text-xs font-bold">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Trang ${p}`}
            className={`${boxCls} ${p === page ? 'bg-[#232226] text-white hover:bg-[#232226]' : ''}`}
          >
            {p}
          </button>
        )
      )}
      {page < total && (
        <button type="button" onClick={() => onChange(page + 1)} aria-label="Trang sau" className={boxCls}>
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </nav>
  );
};

/* ---------- Trang Sản phẩm yêu thích (route con của HomeLayout) ---------- */
export const ProductFavoritePage = () => {
  const [sortDraft, setSortDraft] = useState('asc');
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);
  const [liked, setLiked] = useState(() => new Set());

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === 'asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleLike = (id) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const apply = () => {
    setSort(sortDraft);
    setPage(1);
  };

  const goTo = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Banner />
      <FilterBar value={sortDraft} onChange={setSortDraft} onApply={apply} />

      <section className="mx-auto max-w-[1710px] px-5 pb-20 pt-12 lg:px-[4vw]" aria-label="Danh sách Sản phẩm yêu thích">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} liked={liked.has(p.id)} onToggle={toggleLike} />
          ))}
        </div>
        <Pagination page={page} total={totalPages} onChange={goTo} />
      </section>
    </>
  );
};
