import { useId, useState } from 'react';
import { ChevronDown, ChevronUp, Phone } from 'lucide-react';

/* ---------- Dữ liệu (thay ảnh bằng URL thật ở trường image) ---------- */
const PHONE = '0969011078';

const hero = {
  title: 'Thiết kế nội thất',
  text: 'Liên hệ trực tiếp với xưởng Góc Nhà để được tư vấn giải pháp nội thất phù hợp với ngôi nhà và ngân sách của bạn.',
  image: '',
};

const reasons = [
  {
    title: 'Thực tế giống với 3D',
    heading: 'Hình dung rõ trước khi thi công',
    text: 'Bản vẽ 3D được dựng dựa trên số đo thực tế tại nhà bạn. Chúng tôi trao đổi cụ thể về vật liệu và kích thước để thành phẩm sát với bản thiết kế đã duyệt.',
    image: '',
    tone: 'bg-[#232226]',
  },
  {
    title: 'Luôn cá nhân hóa',
    heading: 'Làm theo nhu cầu',
    text: 'Bạn muốn một mẫu thiết kế dành riêng cho căn nhà của mình? Hãy cho Góc Nhà biết nhu cầu, sở thích và ngân sách, chúng tôi sẽ cùng bạn chọn phương án phù hợp với phong cách riêng của bạn.',
    image: '',
    tone: 'bg-[#323139]',
  },
  {
    title: 'Tư vấn tận tâm',
    heading: 'Làm việc trực tiếp, rõ ràng',
    text: 'Bạn trao đổi trực tiếp với người làm ra sản phẩm và được tư vấn rõ ràng về chi phí, thời gian hoàn thiện. Sau khi bàn giao, Góc Nhà hỗ trợ bảo hành và sửa chữa nếu có vấn đề phát sinh.',
    image: '',
    tone: 'bg-stone-600',
  },
];

const steps = [
  { title: 'Bước 1: Tiếp nhận thông tin và khảo sát', text: 'Góc Nhà lắng nghe nhu cầu, ngân sách và phong cách bạn yêu thích, sau đó đến khảo sát hiện trạng để đo đạc thực tế.' },
  { title: 'Bước 2: Thiết kế ý tưởng', text: 'Góc Nhà đề xuất bố trí mặt bằng, bảng vật liệu và màu sắc để bạn cùng chọn hướng đi cho không gian.' },
  { title: 'Bước 3: Thiết kế phối cảnh 3D', text: 'Ý tưởng được dựng thành hình ảnh 3D chi tiết, giúp bạn hình dung rõ căn nhà trước khi thi công và điều chỉnh nếu cần.' },
  { title: 'Bước 4: Ký hợp đồng thi công', text: 'Hai bên thống nhất hạng mục, tiến độ và chi phí, sau đó ký hợp đồng thi công.' },
  { title: 'Bước 5: Triển khai thi công', text: 'Thợ của xưởng thi công theo đúng bản vẽ đã duyệt và cập nhật tiến độ thường xuyên cho bạn.' },
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
        Là xưởng nội thất gia đình hoạt động từ năm 2020, Góc Nhà làm việc trực tiếp với từng khách hàng, từ tư vấn, thiết kế đến thi công.
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
    <Process />
  </>
);