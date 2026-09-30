import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

/* ---------- Dữ liệu mẫu (thay bằng API / dữ liệu thật) ---------- */
const bestSellers = [
  { id: 1, name: 'Thảm Delicate 08', price: 21900000, image: '' },
  { id: 2, name: 'Thảm Delicate 06', price: 21900000, image: '' },
  { id: 3, name: 'Thảm Ultimate 04', price: 21900000, image: '' },
  { id: 4, name: 'Gương Specchi', price: 59900000, image: '' },
  { id: 5, name: 'Sofa da Nova 2 chỗ', price: 38500000, image: '' },
  { id: 6, name: 'Ghế ăn Tania', price: 7200000, image: '' },
  { id: 7, name: 'Đèn thả Pirce', price: 12800000, image: '' },
  { id: 8, name: 'Bàn trà Nami', price: 9600000, image: '' },
];

// image: điền URL ảnh thật. Để trống sẽ hiển thị khối màu giữ chỗ.
const sections = [
  {
    id: 'thiet-ke-noi-that',
    title: 'Thiết kế nội thất',
    text: 'Với kinh nghiệm hơn 27 năm trong thiết kế và hoàn thiện nội thất cùng đội ngũ thiết kế chuyên nghiệp, Góc Nhà mang đến giải pháp toàn diện trong nội thất.',
    href: '#thiet-ke-noi-that',
    image: '',
    tone: 'bg-stone-300',
    imageSide: 'right',
  },
];

const heroSlides = [
  {
    eyebrow: 'HÀNG MỚI VỀ',
    title: 'Côte',
    accent: 'Noire',
    text: 'Bộ sưu tập hoa & hương thơm cao cấp mới nhất đã có mặt tại Góc Nhà',
    href: '#san-pham',
    image: '', // điền URL ảnh banner 1
  },
  {
    eyebrow: 'BỘ SƯU TẬP MỚI',
    title: 'Không gian',
    accent: 'sống',
    text: 'Sofa, bàn ghế và đồ trang trí cho căn nhà của bạn',
    href: '#san-pham',
    image: '', // điền URL ảnh banner 2
  },
];

const formatVnd = (n) => `${n.toLocaleString('en-US')} VND`;

/* ---------- Thành phần nhỏ ---------- */
const Photo = ({ src, alt, tone, className = '' }) =>
  src ? (
    <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  ) : (
    <div className={`${tone ?? 'bg-stone-200'} ${className}`} role="img" aria-label={alt} />
  );

const PillLink = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex h-7 items-center border border-[#323139] px-4 text-[11px] font-bold text-[#323139] transition-colors hover:bg-[#323139] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#323139]"
  >
    {children}
  </a>
);

const ProductCard = ({ product, liked, onToggle }) => (
  <article className="group relative flex flex-col">
    <button
      type="button"
      onClick={() => onToggle(product.id)}
      aria-pressed={liked}
      aria-label={`Yêu thích ${product.name}`}
      className="absolute right-2 top-2 z-10 text-stone-600 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
    >
      <Heart className="size-4" strokeWidth={1.6} fill={liked ? '#dc2626' : 'none'} stroke={liked ? '#dc2626' : 'currentColor'} aria-hidden="true" />
    </button>
    <a href={`#san-pham-${product.id}`} className="flex flex-col">
      <Photo
        src={product.image}
        alt={product.name}
        tone="bg-stone-100"
        className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <h3 className="mt-5 text-[13px] font-bold text-stone-900">{product.name}</h3>
      <p className="mt-4 text-[11px] font-bold text-stone-800">{formatVnd(product.price)}</p>
    </a>
  </article>
);

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;
  const go = (i) => setIndex((i + count) % count);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  const arrow =
    'absolute top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center border border-white/70 text-white transition-colors hover:bg-white hover:text-[#323139] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  return (
    <section
      className="relative isolate min-h-[420px] overflow-hidden bg-stone-700 md:min-h-[640px]"
      aria-roledescription="carousel"
      aria-label="Banner nổi bật"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.title}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} / ${count}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 flex items-end transition-opacity duration-700 ${i === index ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          {slide.image ? (
            <img src={slide.image} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
          ) : (
            <div className={`absolute inset-0 -z-20 ${i % 2 ? 'bg-stone-600' : 'bg-stone-700'}`} aria-hidden="true" />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-black/10 to-black/20" aria-hidden="true" />

          <div className="w-full px-5 pb-20 text-white md:pb-24 lg:px-[4vw]">
            <div className="max-w-[640px]">
              <p className="text-sm font-bold tracking-wide text-amber-500">{slide.eyebrow}</p>
              <h2 className="mt-10 text-5xl font-light italic tracking-tight md:text-7xl">
                {slide.title} <span className="text-amber-500">{slide.accent}</span>
              </h2>
              <p className="mt-16 max-w-[430px] text-xl font-medium leading-relaxed">{slide.text}</p>
              <a
                href={slide.href}
                tabIndex={i === index ? 0 : -1}
                className="mt-6 inline-flex h-9 items-center gap-2 border border-white px-5 text-xs font-bold transition-colors hover:bg-white hover:text-[#323139] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Khám phá ngay
                <ChevronRight className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      ))}

      <button type="button" aria-label="Ảnh trước" onClick={() => go(index - 1)} className={`${arrow} left-4`}>
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button type="button" aria-label="Ảnh sau" onClick={() => go(index + 1)} className={`${arrow} right-4`}>
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Xem ảnh ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${i === index ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </section>
  );
};

const BestSellers = () => {
  const [liked, setLiked] = useState(() => new Set());
  const toggle = (id) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section aria-labelledby="ban-chay" id="san-pham">
      <div className="flex items-baseline gap-5 border-b border-stone-200 pb-2">
        <h2 id="ban-chay" className="border-b border-orange-700 pb-2 text-[15px] font-medium uppercase text-stone-900">
          Bán chạy nhất
        </h2>
        <a href="#san-pham" className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-900 hover:text-orange-700">
          xem tất cả <ChevronRight className="size-3" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {bestSellers.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} liked={liked.has(p.id)} onToggle={toggle} />
        ))}
      </div>
    </section>
  );
};

const SplitSection = ({ title, text, href, image, tone, imageSide, portrait, id }) => {
  const imageRight = imageSide === 'right';
  return (
    <section id={id} className="grid min-h-[420px] bg-stone-100 md:min-h-[560px] md:grid-cols-2" aria-labelledby={`${id}-title`}>
      <Photo
        src={image}
        alt={title}
        tone={tone}
        className={`min-h-[280px] w-full md:h-full ${imageRight ? 'md:order-2' : 'md:order-1'}`}
      />
      <div
        className={`flex items-center px-8 py-12 md:px-[6vw] ${imageRight ? 'md:order-1 md:justify-end' : 'md:order-2 md:justify-center'}`}
      >
        <div className={portrait ? 'max-w-[430px]' : 'max-w-[250px]'}>
          {portrait && <Photo src="" alt="Sofa da" tone="bg-stone-300" className="mb-8 aspect-[4/5] w-full" />}
          <h2 id={`${id}-title`} className="text-[15px] font-bold text-stone-900">{title}</h2>
          <p className="mb-6 mt-4 text-[11px] font-medium leading-[17px] text-stone-900">{text}</p>
          <PillLink href={href}>Xem thêm</PillLink>
        </div>
      </div>
    </section>
  );
};

/* ---------- Trang Home (đặt làm route index trong HomeLayout) ---------- */
export const HomePage = () => (
  <>
    <Hero />
    <div className="mx-auto max-w-[1500px] px-5 py-10 lg:px-[4vw]">
      <BestSellers />
    </div>

    {sections.map((s) => (
      <SplitSection key={s.id} {...s} />
    ))}
  </>
);
