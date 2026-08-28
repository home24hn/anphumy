# APMTECH.VN — ARCHITECTURE.md

> **Trạng thái:** Single Source of Truth (SSOT) cho kiến trúc kỹ thuật APMTech.vn  
> **Phiên bản:** 1.1  
> **Ngôn ngữ mặc định:** Tiếng Việt  
> **Ngôn ngữ bổ sung:** English  
> **Mục tiêu:** Xây dựng website doanh nghiệp chuyên nghiệp, gọn, dễ vận hành; sau khi website đã lên production, APM Tech có thể tự thêm/sửa/xóa các công trình đã hoàn thành mà không cần mở Cursor hay deploy lại mã nguồn.

---

# 1. Bối cảnh doanh nghiệp

APM Tech là công ty quy mô nhỏ, hiện hoạt động trong các lĩnh vực:

## Technology Infrastructure

- Camera an ninh / CCTV
- Hệ thống mạng
- Hạ tầng Wi-Fi
- Kiểm soát ra vào
- Hệ thống điện nhẹ (ELV)
- Bảo trì hệ thống điện nhẹ

## Energy

APM Tech đang mở rộng năng lực sang:

- Solar PV
- Battery Energy Storage System (BESS)
- Energy Management

Website phải thể hiện đúng năng lực hiện tại, đồng thời tạo nền tảng thương hiệu để APM Tech phát triển mảng Energy trong tương lai.

Không được mô tả APM Tech là “hàng đầu”, “số 1”, “leading provider” hoặc gán các năng lực/dự án/chứng nhận chưa có dữ liệu thực tế chứng minh.

---

# 2. Mục tiêu của website

Website phải phục vụ 4 mục tiêu chính:

1. Giới thiệu APM Tech một cách chuyên nghiệp và đáng tin.
2. Trình bày rõ các nhóm giải pháp đang cung cấp.
3. Trưng bày các công trình APM Tech đã hoàn thành như một tài sản bán hàng.
4. Tạo nền tảng thương hiệu để mở rộng sang Energy/BESS.

Website **không phải** là:

- website thương mại điện tử;
- hệ thống CRM;
- cổng khách hàng;
- phần mềm quản lý dự án;
- CMS tổng quát;
- website bán thiết bị camera đơn lẻ.

---

# 3. Nguyên tắc định vị thương hiệu

APM Tech phải được thể hiện như một công ty giải pháp kỹ thuật.

Website phải tạo cảm giác:

- Professional
- Technical
- Modern
- Minimal
- Trustworthy
- Industrial
- Premium but restrained

Không được tạo cảm giác:

- cửa hàng camera;
- website bán thiết bị CCTV;
- agency marketing;
- startup SaaS;
- công ty thương mại tổng hợp;
- website nhiều hiệu ứng nhưng ít nội dung thật.

Kiến trúc thương hiệu:

```text
APM TECH
│
├── TECHNOLOGY INFRASTRUCTURE
│   ├── Security & CCTV
│   ├── Network Infrastructure
│   ├── Access Control
│   └── ELV Maintenance
│
└── ENERGY
    ├── Solar PV
    ├── BESS
    └── Energy Management
```

**Energy là một business pillar riêng.**

Không trình bày Solar/BESS như một service card nhỏ nằm ngang hàng với Camera, Network, Access Control.

---

# 4. Phạm vi V1

Website public:

```text
/
├── /solutions
├── /projects
│   └── /projects/[slug]
├── /energy
├── /about
└── /contact
```

Admin:

```text
/admin
├── /admin/login
└── /admin/projects
    ├── /admin/projects/new
    └── /admin/projects/[id]
```

Bản tiếng Anh:

```text
/en
├── /en/solutions
├── /en/projects
│   └── /en/projects/[slug]
├── /en/energy
├── /en/about
└── /en/contact
```

V1 chưa cần:

- Blog / Insights
- Ecommerce
- CRM
- Customer portal
- User registration
- Multi-role enterprise CMS
- Analytics dashboard riêng
- Product catalog
- Quotation engine
- AI translation
- WordPress-style admin
- quản trị homepage bằng database

Các chức năng này chỉ được thêm khi có yêu cầu kinh doanh rõ ràng.

---

# 5. Quyết định kiến trúc quan trọng

APMTech.vn sử dụng mô hình:

```text
NỘI DUNG CỐ ĐỊNH
Homepage
Solutions
Energy
About
Contact
        ↓
       CODE

NỘI DUNG THƯỜNG XUYÊN CẬP NHẬT
Công trình đã hoàn thành
        ↓
     DATABASE
```

Điều này có nghĩa:

- Nội dung cố định được quản lý trong source code.
- Công trình được quản lý qua `/admin`.
- Không cần mở Cursor để thêm công trình mới.
- Không cần deploy lại website khi publish một công trình.

---

# 6. Tech Stack

Sử dụng:

```text
Framework
Next.js — App Router

Language
TypeScript

Styling
Tailwind CSS

Database
Supabase PostgreSQL

Authentication
Supabase Auth

Media Storage
Supabase Storage

Deployment
Vercel hoặc nền tảng tương thích Next.js

Source Control
Git / GitHub
```

Không tự ý bổ sung:

- Prisma
- Firebase
- Strapi
- WordPress
- Redux
- Zustand
- GraphQL
- tRPC
- custom backend server
- Docker
- Kubernetes
- microservices

trừ khi có lý do kỹ thuật rõ ràng và được APM Tech yêu cầu.

---

# 7. Kiến trúc tổng thể

```text
                         APMTECH.VN
                              │
              ┌───────────────┴───────────────┐
              │                               │
        WEBSITE CÔNG KHAI                  ADMIN
              │                               │
          Next.js                         /admin
              │                               │
              │                     Quản lý Công trình
              │                               │
              └───────────────┬───────────────┘
                              │
                           SUPABASE
                    ┌─────────┼─────────┐
                    │         │         │
                 Database   Storage    Auth
                    │         │         │
                 Công trình    Ảnh      Admin
```

Public website và Admin nằm trong cùng project Next.js nhưng phải tách rõ trách nhiệm.

---

# 8. Sitemap public

Menu desktop:

```text
APM TECH

Giải pháp
Công trình
Energy
Về APM
Liên hệ

                         VI | EN
```

Tên tiếng Việt ưu tiên dùng **Công trình** thay vì “Projects” trên giao diện.

Lý do: APM Tech là doanh nghiệp kỹ thuật, “Công trình” tạo cảm giác thực tế và phù hợp hơn.

---

# 9. Homepage Architecture

Thứ tự section V1:

```text
HEADER

01 HERO

02 APM TECH LÀM GÌ?

03 GIẢI PHÁP

04 CÔNG TRÌNH ĐÃ THỰC HIỆN

05 BẢO TRÌ HỆ THỐNG

06 APM ENERGY

07 VỀ APM TECH

08 CONTACT CTA

FOOTER
```

## 9.1 Hero

Mục tiêu: định vị nhanh APM Tech.

Định hướng nội dung:

```text
APM TECH

Hạ tầng công nghệ
cho doanh nghiệp và công trình.

Camera an ninh · Hệ thống mạng · Kiểm soát ra vào
Điện nhẹ · Bảo trì · Giải pháp năng lượng
```

CTA:

```text
Tư vấn giải pháp
Xem công trình
```

Không sử dụng claim phóng đại.

## 9.2 APM Tech làm gì?

Giải thích ngắn gọn APM Tech cung cấp giải pháp hạ tầng công nghệ cho doanh nghiệp và công trình.

Không viết đoạn giới thiệu dài.

## 9.3 Giải pháp

4 nhóm chính:

```text
Security & CCTV
Network Infrastructure
Access Control
ELV Maintenance
```

Energy không nằm trong grid này.

## 9.4 Công trình đã thực hiện

Hiển thị 3–6 công trình có:

```text
featured = true
status = published
```

Mỗi card:

```text
Ảnh
Tên công trình
Category
Địa điểm
Năm
```

## 9.5 Bảo trì hệ thống

Nhấn mạnh:

- System Health Check
- Preventive Maintenance
- Troubleshooting
- Annual Maintenance

## 9.6 APM Energy

Section riêng:

```text
Solar PV
BESS
Energy Management
```

Thông điệp phải phản ánh đúng giai đoạn phát triển năng lực.

## 9.7 Về APM Tech

Một section ngắn, đủ tăng độ tin cậy.

## 9.8 Contact CTA

Ví dụ:

```text
Có một hệ thống cần triển khai hoặc nâng cấp?

Trao đổi với APM Tech.
```

---

# 10. Trang Công trình

URL:

```text
/projects
```

Bản tiếng Anh:

```text
/en/projects
```

Hiển thị:

```text
CÔNG TRÌNH APM TECH

Các công trình chúng tôi đã triển khai.

[Tất cả]
[Camera]
[Network]
[Access]
[Maintenance]
[Energy]
```

Danh sách công trình lấy trực tiếp từ Supabase.

Chỉ hiển thị:

```text
status = published
```

Không hiển thị Draft.

---

# 11. Trang chi tiết công trình

URL:

```text
/projects/[slug]
```

Cấu trúc:

```text
Tên công trình

Category
Địa điểm
Năm hoàn thành

Ảnh đại diện

Tổng quan

Nội dung công việc

Gallery ảnh

Contact CTA
```

Ví dụ phần công việc:

```text
NỘI DUNG CÔNG VIỆC

• Khảo sát hiện trạng
• Thiết kế giải pháp
• Thi công hệ thống cáp
• Lắp đặt camera IP
• Cấu hình NVR
• Cấu hình giám sát từ xa
• Kiểm tra và bàn giao
```

Không bắt buộc tất cả công trình phải có nội dung dài.

Công trình nhỏ có thể chỉ gồm:

- tên;
- category;
- location;
- year;
- summary;
- work items;
- ảnh.

---

# 12. Mini Admin

Admin chỉ phục vụ **quản lý Công trình**.

Không xây CMS tổng quát.

URL:

```text
/admin/login
/admin/projects
/admin/projects/new
/admin/projects/[id]
```

Admin V1 không có:

- Dashboard phức tạp
- Analytics
- User management
- Role management
- Media Library riêng
- SEO manager
- Homepage builder
- Theme editor
- Plugin system
- Settings phức tạp

---

# 13. Admin Login

URL:

```text
/admin/login
```

Giao diện:

```text
APM TECH

ADMIN

Email
Password

[Đăng nhập]
```

Không có public signup.

Admin account được tạo trực tiếp trong Supabase Auth.

---

# 14. Admin Projects List

Sau khi đăng nhập:

```text
APM TECH ADMIN

Công trình

                           + Thêm công trình

------------------------------------------------

Hệ thống camera văn phòng ABC

Camera & An ninh
Hà Nội
Đã đăng

                           Sửa

------------------------------------------------

Hạ tầng mạng khách sạn XYZ

Network
Hà Nội
Bản nháp

                           Sửa
```

Không cần sidebar trong V1.

---

# 15. Form Thêm / Sửa công trình

Admin form phải cực đơn giản.

Các field:

```text
Tên công trình

Loại công trình

Địa điểm

Năm hoàn thành

Ảnh đại diện

Giới thiệu ngắn

Nội dung công việc

Gallery ảnh

Hiển thị trên trang chủ

Trạng thái
Draft / Published
```

---

# 16. Work Item Editor

Không sử dụng Rich Text Editor phức tạp trong V1.

Phần **Nội dung công việc** dùng danh sách động:

```text
+ Thêm công việc
```

Ví dụ:

```text
1. Khảo sát hiện trạng
2. Thiết kế giải pháp
3. Thi công hệ thống cáp
4. Lắp đặt 24 camera IP
5. Cấu hình NVR
6. Cấu hình xem từ xa
7. Kiểm tra và bàn giao
```

Admin có thể:

- thêm mục;
- sửa mục;
- xóa mục;
- thay đổi thứ tự.

Dữ liệu lưu dưới dạng JSON / JSONB.

---

# 17. Database Schema

V1 chỉ cần 2 bảng chính:

```text
projects
project_images
```

## 17.1 Table: projects

```text
id                  uuid primary key
slug                text unique not null
title_vi            text not null
title_en            text nullable
category            text not null
location_vi         text nullable
location_en         text nullable
year                integer nullable
summary_vi          text nullable
summary_en          text nullable
work_items_vi       jsonb default '[]'
work_items_en       jsonb default '[]'
cover_image_url     text nullable
featured            boolean default false
status              text  -- draft | published
published_at        timestamptz nullable
created_at          timestamptz
updated_at          timestamptz
```

## 17.2 Table: project_images

```text
id              uuid primary key
project_id      uuid foreign key references projects(id) on delete cascade
image_url       text not null
caption_vi      text nullable
caption_en      text nullable
alt_vi          text nullable
alt_en          text nullable
sort_order      integer default 0
created_at      timestamptz
```

---

# 18. Project Categories

Giá trị lưu trong database:

```text
security
network
access-control
elv-maintenance
solar
bess
energy-management
```

Label tiếng Việt:

```text
security            → Camera & An ninh
network             → Hạ tầng mạng
access-control      → Kiểm soát ra vào
elv-maintenance     → Bảo trì điện nhẹ
solar               → Điện mặt trời
bess                → Hệ thống lưu trữ năng lượng
energy-management   → Quản lý năng lượng
```

---

# 19. Featured Project

Admin có checkbox:

```text
☑ Hiển thị trên trang chủ
```

Homepage tự lấy các công trình:

```text
status = published
featured = true
```

Ưu tiên mới nhất trước, hiển thị 3–6 công trình.

---

# 20. Draft / Published

Mỗi công trình có hai trạng thái:

```text
draft
published
```

Draft:
- chỉ admin thấy;
- không xuất hiện public;
- không index SEO.

Published:
- xuất hiện trên `/projects`;
- truy cập được bằng slug;
- có thể xuất hiện homepage nếu `featured = true`.

Admin có thể Unpublish để đưa công trình về Draft.

---

# 21. Quản lý ảnh

Ảnh lưu trong Supabase Storage.

```text
projects/
└── {project-id}/
    ├── cover/
    └── gallery/
```

Không lưu ảnh công trình production trong repository.

---

# 22. Upload và tối ưu ảnh

Admin hỗ trợ:

- click upload;
- drag & drop nếu ổn định.

Phải kiểm tra:

- MIME type;
- extension;
- file size;
- dimensions.

Mục tiêu:

```text
Input:
4032 × 3024
5–15 MB

↓ resize

max dimension ≈ 2000–2400 px

↓ compress

WebP
```

Public site sử dụng `next/image`.

Gallery có `sort_order`; có thể drag-and-drop hoặc Move Up / Move Down.

---

# 23. Vietnamese First

**Tiếng Việt là ngôn ngữ gốc và mặc định.**

```text
https://anphumy.vn
```

→ tiếng Việt.

Header có:

```text
VI | EN
```

---

# 24. URL Strategy đa ngôn ngữ

Tiếng Việt:

```text
/
 /solutions
 /projects
 /projects/[slug]
 /energy
 /about
 /contact
```

Tiếng Anh:

```text
/en
/en/solutions
/en/projects
/en/projects/[slug]
/en/energy
/en/about
/en/contact
```

Không dùng `/vi` trong V1.

---

# 25. Static UI Translation

Các nội dung cố định được quản lý qua:

```text
lib/i18n/vi.ts
lib/i18n/en.ts
```

Bao gồm:

- menu;
- button;
- section title;
- CTA;
- form label;
- footer;
- validation message.

---

# 26. Dynamic Project Translation

Admin form có:

```text
[ TIẾNG VIỆT ]     [ ENGLISH ]
```

Tiếng Việt bắt buộc.

English tùy chọn.

Các field song ngữ:

```text
title_vi / title_en
location_vi / location_en
summary_vi / summary_en
work_items_vi / work_items_en
caption_vi / caption_en
alt_vi / alt_en
```

V1 không triển khai AI translation.

Nếu bản English chưa có, bản `/en` fallback sang nội dung tiếng Việt và hiển thị thông báo nhỏ:

```text
English translation is not available yet.
```

---

# 27. SEO

Mỗi page hỗ trợ:

- title;
- description;
- canonical;
- Open Graph;
- hreflang;
- structured data khi phù hợp.

Admin không cần nhập SEO riêng cho công trình trong V1.

Hệ thống tự sinh metadata từ:

- title;
- summary;
- category;
- location.

---

# 28. Contact Form

Form:

```text
Họ tên
Công ty
Điện thoại
Email
Nhu cầu
Nội dung
```

Phải có:

- server-side validation;
- chống spam cơ bản;
- success/error state.

Không cần lưu vào database trong V1 nếu chưa có CRM.

---

# 29. Authentication & Security

Admin dùng Supabase Auth.

- Không public signup.
- Protected `/admin`.
- Bật Row Level Security.
- Không expose Service Role Key ra browser.

RLS:

```text
PUBLIC:
SELECT published projects only.

ADMIN:
SELECT / INSERT / UPDATE / DELETE
projects and project_images.
```

---

# 30. Privacy công trình

Ảnh công trình có thể làm lộ:

- vị trí camera;
- sơ đồ mạng;
- IP;
- SSID/password;
- serial;
- rack configuration;
- credential;
- vị trí cửa kiểm soát;
- mặt bằng an ninh;
- thông tin khách hàng.

Workflow:

```text
Ảnh gốc
   ↓
Kiểm tra thông tin nhạy cảm
   ↓
Upload public
```

Không dùng logo/tên khách hàng nếu chưa được phép.

---

# 31. Design System

Màu định hướng:

```text
Background:       #FFFFFF
Dark:             #0B1220
Secondary Dark:   #172033
Light Background: #F5F7FA
Border:           #E5E7EB
Muted Text:       #667085
Accent:           #2563EB
```

Font:

```text
Geist
```

hoặc:

```text
Inter
```

Chỉ dùng một font family chính.

Layout:

```text
Max shell width: ~1280px
Primary content: ~1180–1200px
Desktop padding: 32px
Tablet: 24px
Mobile: 20px
Desktop section spacing: ~120px
Mobile: ~72px
```

Không lạm dụng:

- gradients;
- glassmorphism;
- 3D;
- particles;
- parallax;
- background video;
- animation;
- giant icons;
- SaaS-style cards.

---

# 32. Component Architecture

```text
Page
  ↓
Section
  ↓
Reusable Component
  ↓
Primitive UI
```

Homepage:

```tsx
<Hero />
<CompanyIntro />
<SolutionsOverview />
<FeaturedProjects />
<MaintenanceSection />
<EnergySection />
<AboutPreview />
<ContactCTA />
```

Không tạo một `page.tsx` khổng lồ.

---

# 33. Folder Structure

```text
apmtech/
│
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── solutions/
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   ├── energy/
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── en/
│   │   ├── page.tsx
│   │   ├── solutions/
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   ├── energy/
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── admin/
│   │   ├── login/
│   │   └── projects/
│   │       ├── page.tsx
│   │       ├── new/
│   │       └── [id]/
│   │
│   ├── api/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── home/
│   ├── projects/
│   ├── admin/
│   │   ├── ProjectForm.tsx
│   │   ├── WorkItemEditor.tsx
│   │   ├── ImageUploader.tsx
│   │   └── ImageSorter.tsx
│   └── ui/
│
├── lib/
│   ├── supabase/
│   ├── projects/
│   ├── i18n/
│   ├── seo/
│   └── utils.ts
│
├── types/
├── public/
├── middleware.ts
├── ARCHITECTURE.md
├── CONTENT-GUIDE.md
├── README.md
└── .env.local
```

Không tạo thêm abstraction nếu chưa cần.

---

# 34. Performance, Accessibility, Responsive

Ưu tiên:

- Server Components mặc định;
- Client Components chỉ khi cần;
- tối ưu ảnh;
- ít JavaScript client;
- ít third-party scripts.

Phải có:

- semantic HTML;
- keyboard navigation;
- focus states;
- form labels;
- alt text;
- heading hierarchy;
- contrast hợp lý.

Test tối thiểu:

```text
Mobile
Tablet
Laptop
Desktop
```

---

# 35. Error Handling

Khi phù hợp phải có:

```text
not-found.tsx
error.tsx
loading.tsx
```

Project không tồn tại → 404.

Draft project → public không được truy cập.

---

# 36. Cursor Rules

Cursor phải đọc `ARCHITECTURE.md` trước khi:

- tạo kiến trúc;
- thêm package;
- thay đổi database;
- thêm route;
- thay đổi admin;
- thay đổi localization;
- triển khai feature lớn.

Prompt nền:

```text
Before implementing this task, read ARCHITECTURE.md.

Treat ARCHITECTURE.md as the Single Source of Truth for APMTech.vn.

Do not introduce a new framework, database, CMS, authentication system,
state-management library, architectural pattern, localization strategy,
or deployment architecture unless explicitly requested.

The admin area is intentionally limited to project management.

Do not expand it into a general CMS unless explicitly requested.

If the requested implementation conflicts with ARCHITECTURE.md,
identify the conflict before changing the architecture.
```

Cursor phải:

- dùng TypeScript strict;
- tránh `any` nếu không cần;
- validate dữ liệu;
- xử lý loading/error;
- không hardcode secret;
- không hardcode production URL;
- không thêm package nếu native/Next.js API đã đủ;
- không dùng mock project như dự án thật;
- không nới lỏng security chỉ để code chạy;
- không bỏ RLS trong production.

---

# 37. Những gì Admin KHÔNG quản lý

V1 admin không quản lý:

```text
Homepage
Solutions content
Energy content
About content
Contact content
Header
Footer
Logo
Theme
Colors
Fonts
SEO global
Users
Roles
Blog
Products
```

Đây là chủ ý kiến trúc.

---

# 38. Future Expansion

Chỉ khi có nhu cầu thực tế mới mở rộng:

```text
/admin/articles
/insights
/solutions/[slug]
/energy/solar
/energy/bess
/energy/energy-management
```

Không xây trước.

---

# 39. Definition of Done — V1

## Public

- Homepage
- Solutions
- Projects listing
- Project detail
- Energy
- About
- Contact
- VI/EN switcher
- Responsive
- SEO cơ bản
- Contact form
- Error states

## Admin

- Login / Logout
- Projects list
- Create
- Edit
- Delete
- Draft / Publish / Unpublish
- Featured
- Cover upload
- Gallery upload
- Gallery sorting
- Work Item Editor
- Vietnamese content
- English content

## Infrastructure

- Supabase Database
- Supabase Auth
- Supabase Storage
- RLS
- Environment variables
- Production deployment
- Security review
- Performance review

---

# 40. Những quyết định đã khóa

Cursor không được tự thay đổi:

1. Next.js App Router.
2. TypeScript.
3. Tailwind CSS.
4. Supabase PostgreSQL.
5. Supabase Auth.
6. Supabase Storage.
7. Vietnamese-first.
8. English là ngôn ngữ thứ hai.
9. Vietnamese dùng root URL.
10. English dùng `/en/...`.
11. Công trình là dynamic content.
12. Công trình được quản lý qua `/admin`.
13. Admin chỉ quản lý Công trình trong V1.
14. Không có general-purpose CMS.
15. Không dùng Markdown làm nguồn production cho Công trình.
16. Nội dung công việc dùng danh sách động / JSONB.
17. Energy là business pillar riêng.
18. Không phóng đại năng lực BESS.
19. Không cần mở Cursor/deploy lại để đăng công trình.
20. Không over-engineer.

---

# 41. Thứ tự ưu tiên kiến trúc

```text
1. Dễ vận hành
2. An toàn
3. Đơn giản
4. Dễ bảo trì
5. Trải nghiệm admin dễ dùng
6. Performance
7. Dễ mở rộng
8. Visual novelty
```

APM Tech là doanh nghiệp nhỏ.

Kiến trúc phải phục vụ hoạt động kinh doanh thực tế, không phục vụ việc thể hiện độ phức tạp kỹ thuật.

---

# 42. Nguyên tắc cuối cùng

Nếu một tính năng mới khiến APM Tech phải:

- mở Cursor chỉ để cập nhật nội dung;
- deploy lại chỉ để đăng công trình;
- phụ thuộc thêm vào lập trình viên nhưng không tạo giá trị rõ ràng;
- thêm quá nhiều hệ thống chỉ để giải quyết nhu cầu đơn giản;

thì phải xem lại thiết kế trước khi triển khai.

Website phải là **một công cụ kinh doanh dễ vận hành**, không phải một dự án phần mềm phức tạp.
