import { Link } from 'react-router-dom';

/* ---------- Dữ liệu (thay bằng nội dung thật) ---------- */
const aboutStats = [
  { value: '2020', label: 'Năm thành lập' },
  { value: '6', label: 'Năm hoạt động' },
];

const aboutValues = [
  { title: 'Làm trực tiếp tại xưởng', text: 'Từng sản phẩm được gia công ngay tại xưởng của gia đình, kiểm tra kỹ trước khi giao đến tay bạn.' },
  { title: 'Đặt làm theo nhu cầu', text: 'Kích thước, vật liệu và màu sắc có thể điều chỉnh để phù hợp với không gian của từng nhà.' },
  { title: 'Tư vấn tận tâm', text: 'Trao đổi trực tiếp với người làm ra sản phẩm, rõ ràng về giá cả và thời gian hoàn thiện.' },
];

const contact = {
  name: 'Góc Nhà Showroom',
  // TODO: điền địa chỉ và giờ mở cửa thật của Góc Nhà
  address: ['Địa chỉ showroom', 'Thành phố, Việt Nam'],
  mapUrl: '', // dán link Google Maps; để trống thì địa chỉ hiển thị dạng chữ thường
  phone: { label: '096 9011 078', tel: '0969011078' },
  email: 'gocnhacare@akacompany.com.vn',
  hours: ['Thứ hai — Chủ nhật', '09h — 21h'],
};

/* ---------- Thành phần dùng chung ---------- */
const Photo = ({ src, alt, tone = 'bg-stone-200', className = '' }) =>
  src ? (
    <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  ) : (
    <div className={`${tone} ${className}`} role="img" aria-label={alt} />
  );

const PageBanner = ({ title, image = '' }) => (
  <section className="relative isolate flex min-h-[220px] items-end overflow-hidden bg-stone-400 md:h-[22vw] md:max-h-[460px]" aria-labelledby="page-title">
    {image && <img src={image} alt="" className="absolute inset-0 -z-20 size-full object-cover" />}
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
    <div className="px-5 pb-10 text-white lg:px-[4vw]">
      <h1 id="page-title" className="text-3xl font-light md:text-4xl">{title}</h1>
      <nav aria-label="Breadcrumb" className="mt-4 flex items-center gap-2 text-xs">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <span aria-hidden="true" className="text-white/70">/</span>
        <span aria-current="page" className="font-bold">{title}</span>
      </nav>
    </div>
  </section>
);

/* ================= VỀ CHÚNG TÔI ================= */
export const AboutPage = () => (
  <>
    <PageBanner title="Về chúng tôi" />

    {/* Giới thiệu: chia đôi, giống section ở trang chủ */}
    <section className="grid min-h-[420px] bg-stone-100 md:min-h-[540px] md:grid-cols-2" aria-labelledby="ve-goc-nha">
      <Photo src="" alt="Không gian Góc Nhà" tone="bg-stone-300" className="min-h-[280px] w-full md:h-full" />
      <div className="flex items-center px-8 py-12 md:px-[6vw]">
        <div className="max-w-[460px]">
          <h2 id="ve-goc-nha" className="text-[15px] font-bold text-stone-900">Về Góc Nhà</h2>
          <span className="mt-3 block h-px w-6 bg-stone-500" aria-hidden="true" />
          <p className="mt-5 text-[13px] font-medium leading-6 text-stone-800">
            Góc Nhà là xưởng nội thất do gia đình vận hành, bắt đầu hoạt động từ năm 2020. Chúng tôi là một cơ sở kinh doanh nhỏ, làm việc trực tiếp với từng khách hàng và chú trọng sự chỉn chu trong từng sản phẩm, từ thiết kế, gia công đến lắp đặt.
          </p>
        </div>
      </div>
    </section>

    {/* Con số */}
    <section className="mx-auto max-w-[1305px] px-5 py-14" aria-label="Góc Nhà qua các con số">
      <dl className="mx-auto grid max-w-[640px] gap-8 text-center sm:grid-cols-2">
        {aboutStats.map((s) => (
          <div key={s.label} className="border-t border-stone-300 pt-6">
            <dt className="order-2 mt-2 text-xs font-medium uppercase tracking-wide text-stone-600">{s.label}</dt>
            <dd className="text-5xl font-light text-stone-900">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>

    {/* Giá trị */}
    <section className="bg-[#323139] px-5 py-14 text-white lg:px-[4vw]" aria-labelledby="gia-tri">
      <div className="mx-auto max-w-[1305px]">
        <h2 id="gia-tri" className="text-center text-2xl font-normal">Giá trị Góc Nhà mang lại</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {aboutValues.map((v) => (
            <article key={v.title} className="border-t border-stone-500 pt-5">
              <h3 className="text-[14px] font-bold uppercase tracking-wide">{v.title}</h3>
              <p className="mt-3 text-xs font-medium leading-6 text-stone-300">{v.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>
);

/* ================= LIÊN HỆ ================= */
const linkCls = 'transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900';

const InfoBlock = ({ title, children }) => (
  <div className="border-t border-stone-300 pt-5">
    <h2 className="text-[14px] font-bold uppercase tracking-wide text-stone-900">{title}</h2>
    <div className="mt-4 grid gap-1 text-[14px] font-medium leading-6 text-stone-800">{children}</div>
  </div>
);

export const ContactPage = () => (
  <>
    <PageBanner title="Liên hệ" />

    <section className="mx-auto grid max-w-[560px] gap-8 px-5 py-16" aria-label="Thông tin liên hệ">
      <InfoBlock title={contact.name}>
        {(() => {
          const lines = contact.address.map((line) => (
            <span key={line} className="block">{line}</span>
          ));
          return contact.mapUrl ? (
            <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>{lines}</a>
          ) : (
            <p>{lines}</p>
          );
        })()}
      </InfoBlock>

      <InfoBlock title="Liên hệ">
        <a href={`tel:${contact.phone.tel}`} className={linkCls}>T {contact.phone.label}</a>
        <a href={`mailto:${contact.email}`} className={linkCls}>E {contact.email}</a>
      </InfoBlock>

      <InfoBlock title="Giờ mở cửa">
        {contact.hours.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </InfoBlock>
    </section>
  </>
);