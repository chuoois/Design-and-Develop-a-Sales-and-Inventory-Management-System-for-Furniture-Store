import { useId, useState } from 'react';
import { ChevronDown, ChevronUp, Phone } from 'lucide-react';

/* ---------- Dữ liệu (thay ảnh bằng URL thật ở trường image) ---------- */
const PHONE = '0969011078';

const hero = {
  title: 'Thiết kế nội thất',
  text: 'Hẹn gặp ngay đội ngũ chuyên nghiệp và giàu kinh nghiệm từ Góc Nhà để được tư vấn những giải pháp hoàn thiện nội thất cho ngôi nhà của bạn.',
  image: '',
};

const reasons = [
  {
    title: 'Thực tế giống với 3D',
    heading: 'Trải nghiệm thực tế trước khi đặt hàng',
    text: 'Bạn thường gặp tình trạng bản phác thảo 3D khác xa với công trình thực tế? Đừng lo, tại Góc Nhà, bạn hoàn toàn yên tâm bởi chất lượng luôn được bảo đảm từ đội ngũ tay nghề cao với thương hiệu hơn 23 năm tuổi. Đặc biệt, trên hệ thống 10 cửa hàng, bạn có thể dễ dàng tham khảo không gian và sản phẩm thực tế trước khi đặt hàng.',
    image: '',
    tone: 'bg-[#232226]',
  },
  {
    title: 'Luôn cá nhân hóa',
    heading: 'Đa dạng thiết kế',
    text: 'Bạn thường bắt gặp nhiều mẫu thiết kế giống nhau khi vô tình đến một địa điểm nào đó? Bạn muốn có một mẫu thiết kế đặc biệt dành riêng cho căn hộ của mình? Hãy nói cho Góc Nhà biết nhu cầu và sở thích của bạn, đội ngũ thiết kế sẽ giúp bạn thể hiện gu thẩm mỹ đình cao cùng cá tính độc đáo của bạn theo phong cách riêng.',
    image: '',
    tone: 'bg-[#323139]',
  },
  {
    title: 'Dịch vụ cao cấp',
    heading: 'Dịch vụ uy tín với thương hiệu bền vững',
    text: 'Với quy trình làm việc chuyên nghiệp, đội ngũ Góc Nhà sẽ tư vấn online và đến tận nơi để trao đổi ngay khi bạn liên hệ. Sau khi công trình hoàn thiện, Góc Nhà luôn sẵn sàng bảo hành và sửa chữa nếu có vấn đề phát sinh.',
    image: '',
    tone: 'bg-stone-600',
  },
];

const steps = [
  { title: 'Bước 1: Tiếp nhận thông tin và khảo sát', text: 'Góc Nhà lắng nghe nhu cầu, ngân sách và phong cách bạn yêu thích, sau đó đến khảo sát hiện trạng để đo đạc thực tế.' },
  { title: 'Bước 2: Thiết kế ý tưởng', text: 'Đội ngũ thiết kế đề xuất bố trí mặt bằng, bảng vật liệu và màu sắc để bạn cùng chọn hướng đi cho không gian.' },
  { title: 'Bước 3: Thiết kế phối cảnh 3D', text: 'Ý tưởng được dựng thành hình ảnh 3D chi tiết, giúp bạn hình dung rõ căn nhà trước khi thi công và điều chỉnh nếu cần.' },
  { title: 'Bước 4: Ký hợp đồng thi công', text: 'Hai bên thống nhất hạng mục, tiến độ và chi phí, sau đó ký hợp đồng thi công.' },
  { title: 'Bước 5: Triển khai thi công', text: 'Đội ngũ thợ lành nghề thi công theo đúng bản vẽ đã duyệt, cập nhật tiến độ thường xuyên cho bạn.' },
  { title: 'Bước 6: Nghiệm thu bàn giao', text: 'Cùng bạn kiểm tra công trình, hoàn thiện những chi tiết cuối cùng và bàn giao kèm chế độ bảo hành.' },
];

const stepRows = [
  { steps: steps.slice(0, 2), image: '', tone: 'bg-stone-400', imageSide: 'right', cols: 'md:grid-cols-[24fr_76fr]', alt: 'Bếp nội thất gỗ' },
  { steps: steps.slice(2, 4), image: '', tone: 'bg-stone-300', imageSide: 'left', cols: 'md:grid-cols-[76fr_24fr]', alt: 'Phòng khách và bếp mở' },
  { steps: steps.slice(4, 6), image: '', tone: 'bg-stone-500', imageSide: 'right', cols: 'md:grid-cols-[33fr_67fr]', alt: 'Phòng ngủ' },
];

/* ---------- Thành phần dùng chung ---------- */
const Photo = ({ src, alt, tone = 'bg-stone-200', className = '' }) =>
  src ? (
    <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  ) : (
    <div className={`${tone} ${className}`} role="img" aria-label={alt} />
  );

const Accordion = ({ title, children, defaultOpen = false, variant = 'plain', Icons = [ChevronDown, ChevronDown] }) => {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const Icon = open ? Icons[1] : Icons[0];
  const head =
    variant === 'bar'
      ? 'border-t border-stone-900 bg-stone-100 px-0 py-4 text-[15px] font-bold text-stone-900'
      : 'border-t border-stone-200 py-4 text-[14px] text-stone-800';

  return (
    <div>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className={`flex w-full items-center justify-between gap-4 text-left transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 ${head}`}
        >
          {title}
          <Icon className="size-5 shrink-0 text-stone-500" aria-hidden="true" />
        </button>
      </h3>
      <div id={id} hidden={!open}>
        {children}
      </div>
    </div>
  );
};

/* ---------- Các khối ---------- */
const Hero = () => (
  <section className="relative isolate flex min-h-[380px] items-center justify-center overflow-hidden bg-stone-700 px-5 py-16 text-center text-white md:h-[38vw] md:max-h-[760px]" aria-labelledby="tknt-title">
    {hero.image && <img src={hero.image} alt="" className="absolute inset-0 -z-20 size-full object-cover" />}
    <div className="absolute inset-0 -z-10 bg-black/45" aria-hidden="true" />
    <div className="max-w-[900px]">
      <h1 id="tknt-title" className="text-4xl font-light uppercase tracking-wide md:text-6xl">{hero.title}</h1>
      <p className="mx-auto mt-6 max-w-[760px] text-xs font-medium leading-6 md:text-sm">{hero.text}</p>
      <a
        href={`tel:${PHONE}`}
        className="mt-8 inline-flex h-11 items-center gap-2 bg-white px-6 text-xs font-bold uppercase text-[#323139] transition-colors hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <Phone className="size-4" aria-hidden="true" />
        Liên hệ ngay: {PHONE}
      </a>
    </div>
  </section>
);

const Reasons = () => (
  <section className="mx-auto max-w-[1500px] px-5 py-14 lg:px-[4vw]" aria-labelledby="ly-do">
    <div className="text-center">
      <h2 id="ly-do" className="text-2xl font-normal text-stone-900">03 lý do nên chọn Góc Nhà</h2>
      <p className="mx-auto mt-4 max-w-[900px] text-[13px] font-medium text-stone-800">
        Với kinh nghiệm hơn 27 năm trong thiết kế và hoàn thiện nội thất cùng đội ngũ thiết kế chuyên nghiệp, Góc Nhà mang đến giải pháp toàn diện trong nội thất.
      </p>
    </div>

    <div className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-3">
      {reasons.map((r) => (
        <Accordion key={r.title} title={r.title} variant="bar" defaultOpen Icons={[ChevronDown, ChevronUp]}>
          <div className="relative mx-auto mt-5 flex min-h-[420px] w-[86%] items-end justify-center overflow-hidden text-center text-white md:min-h-[520px]">
            <Photo src={r.image} alt={r.heading} tone={r.tone} className="absolute inset-0 size-full" />
            <div className="relative p-6">
              <h4 className="text-lg font-normal leading-snug">{r.heading}</h4>
              <p className="mt-4 text-xs font-medium leading-6">{r.text}</p>
            </div>
          </div>
        </Accordion>
      ))}
    </div>
  </section>
);

const Field = ({ label, children }) => (
  <label className="block text-center">
    <span className="mb-1.5 block text-xs font-bold text-stone-900">{label}</span>
    {children}
  </label>
);

const inputCls =
  'block w-full border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 focus:border-stone-900 focus:outline-none';

const ConsultForm = () => {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: gửi dữ liệu new FormData(e.currentTarget) lên API
    setSent(true);
  };

  return (
    <section id="dang-ky-tu-van" className="grid bg-white md:grid-cols-[50%_22%_1fr]" aria-labelledby="tu-van">
      <Photo src="" alt="Đèn thả trang trí" tone="bg-stone-300" className="min-h-[320px] w-full md:h-full md:min-h-[39vw]" />

      <div className="flex items-start justify-center px-5 py-12 md:pt-16">
        <div className="w-full max-w-[260px] md:max-w-[210px]">
          <h2 id="tu-van" className="text-center text-lg font-normal uppercase text-stone-900">Đăng ký tư vấn tại nhà</h2>
          <p className="mt-4 text-center text-[13px] font-medium leading-6 text-stone-800">
            Hẹn gặp ngay tư vấn thiết kế nội thất tại nhà bằng cách để lại thông tin tại form dưới đây
          </p>

          {sent ? (
            <p role="status" className="mt-8 border border-stone-300 bg-stone-50 p-4 text-center text-sm text-stone-800">
              Góc Nhà đã nhận yêu cầu của bạn và sẽ liên hệ sớm.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
              <Field label="Tên của bạn (Yêu cầu)"><input name="name" required className={inputCls} /></Field>
              <Field label="Điện thoại (Yêu cầu)"><input name="phone" type="tel" required className={inputCls} /></Field>
              <Field label="Email của bạn"><input name="email" type="email" className={inputCls} /></Field>
              <Field label="Địa chỉ"><input name="address" className={inputCls} /></Field>
              <Field label="Yêu cầu của bạn (Yêu cầu)"><textarea name="message" required rows={4} className={inputCls} /></Field>
              <input name="file" type="file" aria-label="Tệp đính kèm" className="w-full text-xs text-stone-700 file:mr-2 file:border file:border-stone-400 file:bg-stone-100 file:px-2 file:py-1" />
              <button
                type="submit"
                className="mx-auto h-10 bg-[#232226] px-6 text-xs font-bold uppercase text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#232226]"
              >
                Gửi yêu cầu
              </button>
            </form>
          )}

          <a
            href={`tel:${PHONE}`}
            className="mx-auto mt-8 flex h-10 w-fit items-center bg-[#323139] px-6 text-xs font-bold text-white transition-colors hover:bg-[#232226]"
          >
            Liên hệ: {PHONE}
          </a>
        </div>
      </div>
      <div className="hidden md:block" aria-hidden="true" />
    </section>
  );
};

const Process = () => (
  <section className="mx-auto max-w-[1305px] px-5 py-14" aria-labelledby="quy-trinh">
    <h2 id="quy-trinh" className="text-center text-xl font-normal text-stone-900">Quy trình thiết kế hoàn thiện nội thất</h2>

    <div className="mt-10 grid gap-12">
      {stepRows.map((row, i) => {
        const imageLeft = row.imageSide === 'left';
        return (
          <div key={i} className={`grid items-start gap-6 ${row.cols}`}>
            <div className={`border-b border-stone-200 ${imageLeft ? 'md:order-2' : ''}`}>
              {row.steps.map((s) => (
                <Accordion key={s.title} title={s.title}>
                  <p className="pb-4 text-[13px] font-medium leading-6 text-stone-700">{s.text}</p>
                </Accordion>
              ))}
            </div>
            <Photo
              src={row.image}
              alt={row.alt}
              tone={row.tone}
              className={`aspect-[3/2] w-full ${imageLeft ? 'md:order-1' : ''}`}
            />
          </div>
        );
      })}
    </div>
  </section>
);

/* ---------- Trang Thiết kế nội thất (route con của HomeLayout) ---------- */
export const InteriorDesignPage = () => (
  <>
    <Hero />
    <Reasons />
    <ConsultForm />
    <Process />
  </>
);