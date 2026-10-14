# Nigoto Hub

Workspace nội bộ của **Câu lạc bộ Nhật ngữ Nigoto**.

Nền tảng quản trị hoạt động toàn diện dành cho CLB: Quản lý thành viên · Ban chuyên môn · Sự kiện & Điểm danh QR · Khóa học & Bài học · Công việc & Deadline · Media Center · Phỏng vấn tuyển quân · Quỹ CLB · Thống kê chuyên cần.

---

## 🛠 Công nghệ (Tech Stack)

- **Frontend & Framework**:
  - [React 19](https://react.dev) · [TypeScript](https://www.typescriptlang.org)
  - [TanStack Start](https://tanstack.com/start) (Full-stack SSR framework trên nền Vite 8)
  - [TanStack Router](https://tanstack.com/router) (File-based routing an toàn kiểu dữ liệu)
  - [TanStack Query](https://tanstack.com/query) v5 (Data fetching & server state)
  - [TanStack Table](https://tanstack.com/table) v8 (Hiển thị bảng dữ liệu)
- **UI & Styling**:
  - [Tailwind CSS v4](https://tailwindcss.com)
  - [Radix UI](https://www.radix-ui.com) (Bộ UI primitives headless: Dialog, Dropdown, Tabs, Popover...)
  - [Lucide React](https://lucide.dev) (Icon hệ thống)
  - [Recharts](https://recharts.org) (Biểu đồ thống kê chuyên cần & hoạt động)
  - [QRCode](https://github.com/soldair/node-qrcode) (Tạo mã QR điểm danh real-time)
- **Xác thực (Authentication)**:
  - [Better Auth](https://better-auth.com) (Email & Password, cookie session bảo mật)
- **Cơ sở dữ liệu (Database)**:
  - **PostgreSQL** kết hợp Kysely & driver `pg` (node-postgres)
  - **PGLite** (`@electric-sql/pglite`): Postgres WASM nhúng chạy local/in-memory không cần cài database ngoài khi phát triển

---

## 📁 Cấu trúc Repository (Repository Structure)

```
Project-NIGOTOHUB/
├── migrations/             # Lược đồ cơ sở dữ liệu (SQL migration files)
│   ├── 0001_auth.sql       # Bảng users, sessions, accounts của Better Auth
│   ├── 0002_nigoto.sql     # Bảng thành viên, ban, sự kiện, điểm danh, công việc
│   └── 0003_..._0007.sql   # Khóa học, media center, quỹ CLB, tin nhắn chat
├── public/                 # Tài nguyên tĩnh
│   ├── favicon.svg         # Favicon website
│   ├── icon-180.png        # Apple touch icon (180x180)
│   ├── manifest.webmanifest# PWA Web Manifest tiêu chuẩn
│   └── og.jpg              # Ảnh Open Graph xem trước khi chia sẻ link
├── scripts/                # Scripts vận hành cơ sở dữ liệu
│   ├── migrate.mjs         # Migration runner nạp schema vào PostgreSQL
│   └── migration-plan.mjs  # Logic lập kế hoạch và sắp xếp thứ tự migration
├── src/                    # Mã nguồn chính của ứng dụng
│   ├── components/         # Giao diện & Components tái sử dụng
│   │   ├── ui/             # Radix UI primitives (button, input)
│   │   ├── app-shell.tsx   # Khung giao diện chính (Sidebar, Header, Profile)
│   │   ├── qr-block.tsx    # Component render mã QR điểm danh
│   │   ├── semester-bar.tsx# Thanh lọc và chuyển đổi học kỳ hoạt động
│   │   └── ...             # boot-screen, cover-frame, empty-state, page-header...
│   ├── lib/                # Thư viện dùng chung & Logic cốt lõi
│   │   ├── auth/           # Module xác thực Better Auth (client, server, gates, hooks)
│   │   ├── server/         # Server functions (RPC handlers, emails, actions)
│   │   ├── db.ts           # Dual database client (Postgres / PGLite)
│   │   ├── constants.ts    # Hằng số nghiệp vụ (Roles, Departments, Status, Priorities)
│   │   └── utils.ts        # Hàm tiện ích format ngày giờ, CSS merge, validation
│   ├── routes/             # Định tuyến file-based (TanStack Router)
│   │   ├── __root.tsx      # Shell gốc (HTML head, fonts, toaster, providers)
│   │   ├── login.tsx       # Trang đăng nhập / đăng ký thành viên
│   │   ├── _app.tsx        # Layout kiểm tra quyền đăng nhập (Auth Gate)
│   │   ├── _app/           # Các trang chức năng nội bộ (xem chi tiết bên dưới)
│   │   └── api/auth/$.ts   # API endpoint cho Better Auth
│   ├── router.tsx          # Khởi tạo TanStack Router & Error Boundary
│   ├── routeTree.gen.ts    # Cây định tuyến tự động sinh (Auto-generated)
│   └── styles.css          # Stylesheet toàn cục & Tailwind CSS config
├── .env.example            # Mẫu cấu hình biến môi trường
├── package.json            # Cấu hình scripts & dependencies
├── tsconfig.json           # Cấu hình TypeScript
└── vite.config.ts          # Cấu hình Vite & Nitro (node-server build)
```

---

## 🧭 Chi tiết các phân hệ chức năng (`src/routes/_app/`)

| Đường dẫn (Route) | File xử lý | Mô tả tính năng |
| :--- | :--- | :--- |
| `/` | `index.tsx` | **Bảng tin tổng quan**: Thống kê nhanh, lịch hoạt động gần nhất, bài viết mới. |
| `/members` | `members.index.tsx`, `members.$id.tsx` | **Quản lý thành viên**: MSSV, ngày sinh, số điện thoại, ban chuyên môn, chức vụ. |
| `/departments` | `departments.index.tsx`, `departments.$id.tsx` | **Quản lý ban**: Ban Chủ nhiệm, Thành viên, Truyền thông, Học thuật, Sự kiện. |
| `/events` | `events.index.tsx`, `events.$id.tsx` | **Quản lý sự kiện**: Lên lịch, địa điểm, danh sách tham gia, trạng thái sự kiện. |
| `/attendance` | `attendance.tsx` | **Quản lý điểm danh**: Bảng theo dõi chuyên cần theo sự kiện. |
| `/checkin/:eventId`| `checkin.$eventId.tsx` | **Quét QR Điểm danh**: Thành viên quét QR để xác nhận tham gia tức thì. |
| `/tasks` | `tasks.tsx` | **Quản lý công việc**: Giao việc theo ban, đặt deadline, phân loại độ ưu tiên. |
| `/media` | `media.tsx` | **Media Center**: Lịch đăng bài, trạng thái duyệt nội dung Facebook/TikTok. |
| `/courses` | `courses.index.tsx`, `courses.$id.tsx` | **Khóa học & Học thuật**: Giáo trình, bài học, tài liệu tiếng Nhật. |
| `/phong-van` | `phong-van.tsx` | **Phỏng vấn tuyển thành viên**: Danh sách ứng viên, chấm điểm, đánh giá. |
| `/quy` | `quy.tsx` | **Quản lý Quỹ CLB**: Thu/chi nội bộ, số dư quỹ, lịch sử giao dịch. |
| `/chat` | `chat.tsx` | **Kênh Chat nội bộ**: Thảo luận theo phòng ban và sự kiện. |
| `/calendar` | `calendar.tsx` | **Lịch hoạt động**: Xem sự kiện và lịch phát sóng media theo tháng. |
| `/analytics` | `analytics.tsx` | **Thống kê**: Báo cáo tỷ lệ chuyên cần, năng suất hoàn thành task. |
| `/notifications`| `notifications.tsx` | **Thông báo**: Cập nhật thông tin khẩn cấp từ Ban Chủ nhiệm. |
| `/settings` | `settings.tsx` | **Cài đặt**: Cấu hình tài khoản và phân quyền CLB. |
| `/huong-dan` | `huong-dan.tsx` | **Sổ tay nội bộ**: Hướng dẫn quy trình hoạt động dành cho thành viên mới. |

---

## ⚡ Hướng dẫn cài đặt & khởi chạy nhanh

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Thiết lập môi trường
Sao chép file cấu hình mẫu:
```bash
cp .env.example .env
```
*(Cấu hình `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET` và `DATABASE_URL` nếu dùng PostgreSQL thật)*

### 3. Chạy Development Server
```bash
npm run dev
```
Mở trình duyệt tại: `http://localhost:8080`

> 💡 **Tài khoản Chủ nhiệm (Admin)**: Người đầu tiên đăng ký tài khoản tại trang `/login` sẽ tự động được hệ thống gán vai trò **Chủ nhiệm (Admin/President)** của CLB.

### 4. Build Production (Node Server độc lập)
```bash
npm run build
npm run db:migrate
```
Chạy bản build production:
```bash
node .output/server/index.mjs
```
