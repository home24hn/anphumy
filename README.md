# APM Tech — apmtech.vn / anphumy.vn

Website doanh nghiệp cho APM Tech: trang public song ngữ (VI mặc định, EN ở `/en`) và một
mini admin để quản lý Công trình. Kiến trúc chi tiết: xem [`ARCHITECTURE.md`](./ARCHITECTURE.md)
(Single Source of Truth — đọc trước khi thay đổi kiến trúc).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres + Auth + Storage).

## 1. Cài đặt

```bash
npm install
```

## 2. Cấu hình Supabase

1. Tạo project mới tại [supabase.com](https://supabase.com/dashboard).
2. Vào **SQL Editor**, chạy toàn bộ nội dung file [`supabase/schema.sql`](./supabase/schema.sql).
   File này tạo bảng `projects` / `project_images`, bật Row Level Security, và tạo bucket
   Storage `projects` (public read, chỉ admin đã đăng nhập mới ghi được).
3. Vào **Authentication → Users**, tạo thủ công 1 tài khoản admin (email + password).
   Không có đăng ký công khai — đây là chủ ý kiến trúc (section 13, 29).
4. Vào **Project Settings → API**, copy `Project URL` và `anon public` key.
5. Sao chép `.env.local.example` thành `.env.local` và điền hai giá trị trên:

```bash
cp .env.local.example .env.local
```

Không cần `SUPABASE_SERVICE_ROLE_KEY` cho vận hành bình thường — admin dùng phiên đăng nhập
của chính tài khoản admin (RLS `authenticated` policy), không dùng service role key.

## 3. Chạy dev server

```bash
npm run dev
```

- Trang public: http://localhost:3000
- Bản tiếng Anh: http://localhost:3000/en
- Admin: http://localhost:3000/admin/login

Nếu chưa cấu hình `.env.local`, trang public vẫn chạy được (phần Công trình sẽ hiện trạng thái
rỗng), còn `/admin` sẽ hiện thông báo hướng dẫn cấu hình thay vì lỗi.

## 4. Build production

```bash
npm run build
npm run start
```

## 5. Việc cần APM Tech quyết định thêm (chưa có trong ARCHITECTURE.md)

- **Kênh nhận liên hệ**: Form ở `/contact` hiện chỉ validate và ghi log server-side
  ([`lib/actions/contact.ts`](./lib/actions/contact.ts)) — ARCHITECTURE.md nói rõ V1 không cần
  lưu database, nhưng chưa chỉ định email/CRM nào sẽ nhận thông tin liên hệ. Cần nối vào một
  kênh thật (email API, webhook, hoặc một bảng Supabase) trước khi lên production.
- **Thông tin liên hệ thật**: email/số điện thoại trong Footer và trang Liên hệ hiện là
  placeholder (`contact@anphumy.vn`, `+84 000 000 000`) — cần thay bằng thông tin thật.
- **Domain**: đã cấu hình `anphumy.vn` làm domain chính (metadata, sitemap, robots.txt).

## Cấu trúc thư mục

Xem section 33 của `ARCHITECTURE.md`.
