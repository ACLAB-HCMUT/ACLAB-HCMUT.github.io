---
sidebar_position: 2
title: 3D Printing
---

# 3D Printing

Biến một mô hình CAD thành chi tiết vật lý — vỏ máy, đồ gá (jig), giá đỡ (bracket), bộ phận robot.

## Các loại máy in

| Loại | Cách hoạt động | Ưu điểm | Đánh đổi |
| --- | --- | --- | --- |
| **FDM** (sợi nhựa) | Nung chảy và đùn nhựa theo từng lớp | Rẻ, dễ, chi tiết lớn, vật liệu bền | Thấy rõ các lớp, ít chi tiết tinh xảo |
| **Resin (SLA/MSLA)** | Đông cứng nhựa lỏng bằng tia UV/ánh sáng | Chi tiết rất tinh xảo, bề mặt mịn | Bừa bộn, có mùi, cần rửa + chiếu UV, giòn |

## Vật liệu thông dụng (FDM)

- **PLA** — dễ in nhất, cứng, nhiệt độ thấp; rất tốt cho nguyên mẫu.
- **PETG** — bền hơn, chịu nhiệt/hóa chất tốt hơn.
- **ABS / ASA** — bền, chịu nhiệt; cần buồng kín (bị cong vênh, có khí thải).
- **TPU** — chi tiết dẻo.
- Sợi nhựa kỹ thuật (nylon, có pha sợi carbon) cho các chi tiết chức năng.

## Quy trình

1. Dựng mô hình trong CAD → xuất file **STL/STEP**.
2. **Cắt lớp (slice)** (Cura, PrusaSlicer, v.v.) → đặt chiều cao lớp, độ điền (infill), giá đỡ (support) → xuất G-code.
3. In → tháo giá đỡ → (resin: rửa + chiếu UV).

:::caution Thông gió và xử lý
ABS/resin phát thải khí — hãy dùng hệ thống thông gió. **Resin chưa đông cứng có độc tính/gây kích ứng** — hãy đeo găng tay và
kính bảo hộ và thải bỏ đúng cách.
:::

:::tip Thiết kế để in được
Lưu ý các phần nhô (overhang) (>45° cần giá đỡ), độ dày thành, dung sai cho mối lắp, và hướng in
để đạt độ bền. In lại rẻ hơn thiết kế lại — hãy lặp lại nhiều lần.
:::
