# Nigoto Hub

Workspace nội bộ của **Câu lạc bộ Nhật ngữ Nigoto**.

Hệ thống quản lý toàn diện: Thành viên · Ban chuyên môn · Sự kiện & Điểm danh QR · Khóa học & Bài học · Công việc · Media Center · Phỏng vấn · Quỹ CLB · Thống kê.

---

## 🛠 Công nghệ

- **Core**: React 19 · TypeScript · TanStack Start (Vite 8) · TanStack Router · TanStack Query
- **UI & Styling**: Tailwind CSS v4 · Radix UI · Lucide React · Recharts · QRCode
- **Auth**: Better Auth (Email/Password & Session)
- **Database**: PostgreSQL (Kysely / node-postgres) kèm fallback nhúng PGLite (WASM)

---

## 🚀 Hướng dẫn cài đặt & chạy Local

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Cấu hình môi trường
Sao chép file mẫu:
```bash
cp .env.example .env
```
Mở file `.env` và cập nhật thông tin:
- `BETTER_AUTH_URL`: Địa chỉ web (`http://localhost:8080` khi test, hoặc tên miền thật khi deploy).
- `BETTER_AUTH_SECRET`: Chuỗi ký tự bí mật dài ngẫu nhiên.
- `DATABASE_URL`: Link kết nối PostgreSQL thật (bỏ trống nếu muốn chạy nhanh qua PGLite).

### 3. Khởi chạy Development Server
```bash
npm run dev
```
Truy cập: `http://localhost:8080`

> **Lưu ý**: Tài khoản đầu tiên đăng ký tại trang `/login` sẽ tự động được gán quyền **Chủ nhiệm (Admin/President)** của CLB.

---

## 🌐 Hướng dẫn Self-Host trên PC với Tên miền riêng

### Bước 1: Chuẩn bị Database
Khởi chạy PostgreSQL (cài đặt trực tiếp trên Windows hoặc qua Docker):
```bash
# Sau khi tạo database 'nigoto_hub', chạy migration:
npm run db:migrate
```

### Bước 2: Build ứng dụng
```bash
npm run build
```
Lệnh trên sẽ tự động đóng gói ứng dụng thành server Node.js độc lập tại `.output/server/index.mjs`.

### Bước 3: Chạy ứng dụng dưới nền (24/7)
Sử dụng **PM2** để server tự khởi động lại khi gặp sự cố hoặc khi mở máy tính:
```bash
npm install -g pm2
pm2 start .output/server/index.mjs --name "nigoto-hub"
pm2 save
```

### Bước 4: Trỏ Tên miền về PC qua Cloudflare Tunnel (Miễn phí & An toàn)
1. Thêm tên miền của bạn vào Cloudflare.
2. Cài đặt `cloudflared` trên PC.
3. Tạo tunnel trỏ tên miền về cổng `http://localhost:8080`.
- *Ưu điểm*: Không cần mở port Modem/Router (chống tấn công mạng nhà), tự động có SSL/HTTPS và DDoS Protection.
