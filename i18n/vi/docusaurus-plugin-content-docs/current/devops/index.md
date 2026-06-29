---
slug: /devops
title: DevOps & Hạ tầng nghiên cứu
---

# DevOps & Hạ tầng nghiên cứu

Các công cụ và thực hành phục vụ cộng tác, khả năng tái lập (reproducibility) và tài nguyên tính toán dùng chung.

## Các chủ đề

- **Quản lý phiên bản:** quy trình Git, branching, pull request, review code
- **CI/CD:** build và test tự động; triển khai trang web này lên GitHub Pages
- **Môi trường:** Docker, môi trường ảo, quản lý phụ thuộc (dependency)
- **Tài nguyên tính toán:** sử dụng GPU/workstation dùng chung, lưu trữ dữ liệu
- **Trang web này:** cách wiki được build (Docusaurus) và cách đóng góp

## Đóng góp cho trang web này

```bash title="Terminal"
git clone https://github.com/ACLAB-HCMUT/ACLAB-HCMUT.github.io.git
cd ACLAB-HCMUT.github.io
npm install
npm run start
```

Sau đó mở `http://localhost:3000`. Nội dung nằm trong `docs/` (Cơ sở tri thức),
`blog/` (Tin tức & Sự kiện) và `src/` (các trang và component của site).
