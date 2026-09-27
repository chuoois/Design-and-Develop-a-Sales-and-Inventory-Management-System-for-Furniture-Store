# AGENTS.md

Hướng dẫn dành cho **bất kỳ AI coding assistant nào** (Claude, ChatGPT/Codex, GitHub Copilot, Cursor, Gemini, Aider...) khi đọc, sửa, hoặc sinh code trong repo này. Nếu công cụ của bạn hỗ trợ tự động đọc `AGENTS.md`, nó sẽ được nạp ngay khi mở project. Nếu không, hãy dán nội dung 2 file dưới đây vào phần system/context prompt trước khi yêu cầu AI code.

## Tech stack
Node.js/Express (backend) + ReactJS/Vite (frontend) + MySQL + Cloudinary (lưu ảnh) + Gmail/Nodemailer (gửi mail), toàn bộ chạy bằng Docker (`docker-compose up --build`).

## Việc BẮT BUỘC phải đọc trước khi sửa code
1. **[docs/CONVENTIONS.md](docs/CONVENTIONS.md)** — cấu trúc thư mục, naming, cách xử lý env/secret, format response API, quy tắc Docker. Đọc trước khi tạo/sửa BẤT KỲ route, controller, model, service, middleware, component hay file cấu hình nào.
2. **[docs/TESTING_AND_DEBUGGING.md](docs/TESTING_AND_DEBUGGING.md)** — cách debug lỗi và viết unit test đúng pattern của project (mock DB/Cloudinary/Gmail, không gọi network thật trong test). Đọc trước khi fix bug hoặc thêm test.

## Quy tắc tối thiểu (tóm tắt nhanh)
- Backend theo MVC: `routes/ -> controllers/ -> models/`; logic bên thứ 3 (mail, ảnh) nằm ở `services/`; hàm thuần dễ test nằm ở `utils/`.
- Frontend: mọi lời gọi API tập trung ở `frontend/src/services/api.js`, không gọi `axios`/`fetch` trực tiếp trong component.
- Không commit `.env` thật, chỉ commit `.env.example`; thêm biến môi trường mới phải cập nhật `.env.example` tương ứng.
- Mọi API trả JSON dạng `{ message, ...data }` và dùng đúng HTTP status (200/201/400/404/409/500).
- `docker-compose.yml` = production, `docker-compose.override.yml` = development (tự merge khi `docker-compose up`) — không xoá file override.
- Thêm logic quan trọng (validate, tính toán, luồng nghiệp vụ) → phải có unit test đi kèm, đặt ở `backend/tests/` hoặc `frontend/src/tests/`, theo pattern mock đã có sẵn trong các file test mẫu.

## Trước khi coi 1 thay đổi là "xong"
- [ ] Đúng cấu trúc thư mục & naming theo `docs/CONVENTIONS.md`
- [ ] Env var mới (nếu có) đã vào đúng `.env.example`
- [ ] Có test tương ứng, chạy `npm test` ở `backend/` và/hoặc `frontend/` pass hết
- [ ] `docker-compose up --build` chạy được, không lỗi
