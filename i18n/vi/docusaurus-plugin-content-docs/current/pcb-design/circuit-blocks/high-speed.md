---
sidebar_position: 5
title: Tín hiệu số tốc độ cao
---

# Tín hiệu số tốc độ cao

USB, Ethernet, HDMI, MIPI, DDR, SPI/QSPI nhanh. Khi sườn tín hiệu đủ nhanh, các đường mạch hành xử
như **đường truyền (transmission line)** — trở kháng, đường hồi tiếp dòng và khớp chiều dài quyết
định link có chạy hay không.

## Trở kháng kiểm soát

- Tín hiệu nhanh cần **trở kháng xác định**, do **stackup** quyết định (bề rộng/khoảng cách đường,
  độ dày điện môi). Hãy yêu cầu xưởng một **stackup kiểm soát trở kháng**.
- Mục tiêu điển hình: **50 Ω** đơn (single-ended); **90 Ω** (USB) / **100 Ω** (Ethernet, HDMI,
  LVDS) vi sai (differential).
- Định tuyến trên một **mặt phẳng tham chiếu liền** (thường là đất) ngay dưới lớp đó.

## Đường hồi tiếp dòng (nửa ẩn)

- Dòng hồi tiếp của mỗi tín hiệu chảy trong mặt phẳng **ngay bên dưới** nó. Giữ mặt phẳng đó
  **liền mạch** — **đừng** định tuyến đường tốc độ cao **cắt qua khe/chỗ hở** của mặt phẳng tham chiếu.
- Thêm **via khâu đất** khi tín hiệu đổi lớp, để dòng hồi tiếp có đường đi.

## Cặp vi sai & khớp chiều dài

- Định tuyến **cặp đi cùng nhau**, khoảng cách không đổi; khớp hai nửa (**skew trong cặp**) thật chặt.
- Khớp **chiều dài trong một bus** (vd song song/DDR) theo spec giao tiếp; dùng serpentine để tinh
  chỉnh khi cần.
- Hạn chế stub và via trên các net nhanh.

## Các giao tiếp thường gặp

| Giao tiếp | Trở kháng | Ghi chú |
| --- | --- | --- |
| USB 2.0 | 90 Ω vi sai | Khớp chiều dài D+/D−; giữ ngắn |
| USB 3 / PCIe | ~85–100 Ω vi sai | Khắt khe; hạn chế via/stub |
| Ethernet (10/100/1000) | 100 Ω vi sai | Khớp cặp; vị trí magnetics |
| HDMI / LVDS / MIPI | 100 Ω vi sai | Skew chặt; định tuyến theo nhóm |

:::caution Lỗi tốc độ cao số 1
**Cắt qua khe mặt phẳng.** Một cặp 100 Ω đẹp đẽ định tuyến qua chỗ hở của mặt đất sẽ phát xạ và
trượt EMC. Lập kế hoạch stackup và các vết cắt mặt phẳng *trước khi* định tuyến.
:::

## Xem thêm

- [Từ thiết kế đến giao hàng](/docs/pcb-design/fabrication-and-ordering) — yêu cầu stackup kiểm soát
- [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes)
- [Nguồn tham khảo & Reference Design](/docs/pcb-design/reference-designs)
