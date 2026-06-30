---
sidebar_position: 4
title: Điện tử công suất & Dòng lớn
---

# Điện tử công suất & Dòng lớn

Mạch lái động cơ, cầu H, FET đóng cắt dòng lớn, đường pin. Ở đây kẻ thù là **nhiệt, mật độ dòng và
nhiễu đóng cắt** — và đôi khi là **điện áp cao / điện lưới**, vốn là vấn đề **an toàn**.

## Đồng & nhiệt

- **Bề rộng = dòng.** Chọn bề rộng đường (hoặc dùng vùng đồng) theo dòng; dùng công cụ tính
  trace-width và cộng thêm biên dự phòng.
- Dùng **đồng dày hơn** (2 oz+) cho các lớp dòng lớn nếu cần.
- Tản nhiệt bằng **vùng đồng (polygon)** và **via nhiệt** dưới linh kiện nóng (FET, ổn áp).
- Giữ đường dòng lớn **ngắn và trực tiếp**; tránh thắt cổ chai mỏng tại pad.

## FET đóng cắt & gate drive

- Giữ **vòng gate-drive nhỏ** (driver → gate → đường về source) — đường gate dài gây dao động và
  làm chậm chuyển mạch.
- Thêm **điện trở gate** để chỉnh tốc độ sườn / giảm dao động.
- Giữ **vòng công suất** (FET + tụ bulk) chặt; đặt tụ decoupling/bulk gần.
- Thêm **đo dòng** (shunt + nối kiểu Kelvin) ở nơi cần hồi tiếp.

## Cách ly, creepage & clearance

- Với điện áp cao hơn, tôn trọng **creepage (theo bề mặt)** và **clearance (qua không khí)** theo
  tiêu chuẩn cho mức điện áp của bạn — nới rộng khe, thêm rãnh.
- Giữ vùng điện áp cao và vùng điện áp thấp / logic tách biệt về vật lý.

## Snubber & bảo vệ

- Thêm **snubber / diode flyback** ngang tải cảm (động cơ, relay, solenoid).
- Bảo vệ đầu vào và đầu ra (TVS, cầu chì) trước quá độ thực tế.

:::danger An toàn
Điện tử công suất rất **nóng** và có thể mang **điện áp/dòng nguy hiểm**. Hãy kiểm tra nhiệt và
clearance trước khi cấp nguồn. Coi mọi thiết kế nối điện lưới là an toàn-trọng yếu — xem
[Nội quy & An toàn phòng lab](/docs/lab-rules).
:::

## Xem thêm

- [Mạch nguồn](/docs/pcb-design/circuit-blocks/power-supply)
- [Nội quy & An toàn phòng lab](/docs/lab-rules)
- [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes)
