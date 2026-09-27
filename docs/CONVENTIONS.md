# Quy ước base của project

Áp dụng cho tất cả người/AI viết code trong repo này. Base: **Node.js/Express + ReactJS/Vite + MySQL + Cloudinary + Gmail (Nodemailer)**, chạy 100% bằng Docker.

## 1. Cấu trúc thư mục backend (bắt buộc theo MVC)

```
backend/src/
├── config/        # kết nối hạ tầng ngoài (db.js, cloudinary.js) — KHÔNG chứa logic nghiệp vụ
├── controllers/   # nhận req/res, gọi model + service, KHÔNG viết SQL trực tiếp ở đây
├── models/        # toàn bộ câu SQL nằm ở đây, KHÔNG viết SQL ở controller
├── routes/        # chỉ khai báo route + middleware, KHÔNG chứa logic
├── middlewares/   # upload, auth, validate...
├── services/      # gọi bên thứ 3 (mailService.js, cloudinaryService.js)
├── utils/         # hàm thuần (validators.js...), PHẢI test được độc lập, không phụ thuộc DB/network
└── app.js         # khởi tạo express app, KHÔNG gọi app.listen() ở đây (tách khỏi server.js để dễ test)
```

Quy tắc cứng:
- Resource mới (vd "product") luôn tạo đủ bộ: `models/productModel.js`, `controllers/productController.js`, `routes/productRoutes.js`, gắn vào `app.js` theo pattern `app.use('/api/products', productRoutes)`.
- Không viết SQL trong controller. Không gọi `cloudinary`/`nodemailer` trực tiếp trong controller — luôn qua `services/`.
- Logic thuần (validate, format, tính toán) tách ra `utils/` để dễ unit test.

## 2. Cấu trúc thư mục frontend

```
frontend/src/
├── components/    # UI tái sử dụng, không tự gọi API trực tiếp
├── pages/         # 1 page = 1 màn hình, được phép gọi services/api.js
├── services/      # api.js (axios instance), mọi lời gọi HTTP tập trung ở đây
├── hooks/         # custom hooks dùng chung
├── context/       # React Context (auth, theme...)
└── tests/         # test file đặt ở đây, không rải rác trong components/pages
```

Quy tắc cứng:
- Không gọi `axios`/`fetch` trực tiếp trong component/page — luôn qua `src/services/api.js` (đã cấu hình `VITE_API_BASE_URL`).

## 3. Naming convention
- File JS: `camelCase.js` (vd `userController.js`); React component: `PascalCase.jsx` (vd `CreateUserPage.jsx`).
- Route path: số nhiều, lowercase (`/api/users`, không phải `/api/User`).
- Bảng MySQL: số nhiều, snake_case (`users`, `order_items`).
- Biến môi trường: `UPPER_SNAKE_CASE`, luôn khai báo trong `.env.example` tương ứng khi thêm mới.

## 4. Environment variables & secrets
- KHÔNG BAO GIỜ commit file `.env` thật (đã có trong `.gitignore`). Chỉ commit `.env.example`.
- Thêm biến môi trường mới → thêm ngay dòng tương ứng vào `.env.example`, kèm comment ngắn.
- Backend đọc qua `process.env.TEN_BIEN` (dùng `dotenv`); frontend đọc qua `import.meta.env.VITE_TEN_BIEN` (bắt buộc tiền tố `VITE_`).

## 5. Response format API (backend)
```json
// Thành công
{ "message": "...", "user": {...} }   // hoặc "users", "data"... tuỳ resource
// Lỗi
{ "message": "Mô tả lỗi ngắn gọn", "error": "chi tiết (optional)" }
```
Status code: 200 (GET ok), 201 (tạo mới), 400 (input sai/thiếu), 404 (không tìm thấy), 409 (conflict, vd email trùng), 500 (lỗi server).

## 6. Docker & môi trường
- `docker-compose.yml` = cấu hình **production** (build target: production).
- `docker-compose.override.yml` = tự động merge khi chạy `docker-compose up`, chuyển sang **development** (hot-reload, mount volume, nodemon/vite dev server). Không xoá file này trừ khi cố tình build production.
- Service mới có dependency (vd DB) → phải có `healthcheck` + `depends_on: condition: service_healthy` theo mẫu service `mysql`.
- Không hardcode host/port — luôn qua biến môi trường (`DB_HOST=mysql` là tên service Docker, không phải `localhost`).

## 7. Thêm dependency mới
- Backend: thêm vào `backend/package.json`. Nếu có xung đột peer dependency, xử lý bằng `--legacy-peer-deps` trong Dockerfile kèm comment lý do (đã áp dụng cho `cloudinary` v2 + `multer-storage-cloudinary` v4).
- Frontend: thêm vào `frontend/package.json`, ưu tiên lib đã có sẵn (`axios`, `vitest`, `@testing-library/*`) trước khi thêm lib mới.

## 8. Checklist trước khi coi 1 thay đổi là "xong"
1. Đúng thư mục/naming theo mục 1–3.
2. Env var mới (nếu có) đã vào `.env.example`.
3. Có unit test cho logic quan trọng (xem `docs/TESTING_AND_DEBUGGING.md`).
4. `docker-compose up --build` chạy được, không lỗi.
