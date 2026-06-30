---
sidebar_position: 4
title: PCB Assembly
---

# PCB Assembly

Các máy dùng để **gắn linh kiện lên board** ngay tại phòng lab — hữu ích cho nguyên mẫu và lô nhỏ
khi bạn không thuê ngoài một nhà gia công. Xem thêm [PCB Design](/docs/pcb-design).

## Chuỗi lắp ráp SMT

1. **Máy in stencil / đồ gá kem hàn** — phủ kem hàn qua một **stencil** thép không gỉ lên các pad.
2. **Máy pick-and-place (P&P)** — đặt các linh kiện SMD lên kem hàn từ cuộn/khay bằng cách căn chỉnh thị giác (vision).
3. **Lò reflow** — gia nhiệt board theo một biên dạng nhiệt độ để kem hàn nóng chảy và hàn tất cả mối nối cùng một lúc.

## Máy móc và công cụ

| Công cụ | Vai trò |
| --- | --- |
| **Máy in stencil** | Phủ kem hàn lặp lại được |
| **Máy pick-and-place** | Đặt linh kiện tự động (tốc độ + độ chính xác) |
| **Lò reflow** | Biên dạng hàn reflow có kiểm soát |
| **Bàn nhiệt reflow (hot plate)** | Board nhỏ/một mặt, reflow nhanh |
| **Trạm rework khí nóng (hot-air)** | Gắn/tháo từng linh kiện SMD riêng lẻ |
| **Hàn sóng/hàn chọn lọc (wave/selective)** | Linh kiện xuyên lỗ ở quy mô lớn (nâng cao) |

:::tip Hàn tay hay hàn máy
Với một hoặc hai nguyên mẫu, **stencil + bàn nhiệt/khí nóng** thường là đủ. Hãy chuyển sang
**pick-and-place + reflow** khi cần đặt nhiều linh kiện hoặc làm nhiều board. Xem các mẹo PCBA trong
[From Design to Delivery](/docs/pcb-design/fabrication-and-ordering).
:::

:::caution Biên dạng nhiệt và kem hàn
Tuân theo **biên dạng reflow** của kem hàn (làm nóng sơ bộ → ngâm nhiệt → reflow → làm nguội) và bảo quản kem hàn
đúng cách. Một biên dạng nhiệt sai gây ra mối hàn nguội (cold joint), hiện tượng tombstoning hoặc làm hỏng linh kiện.
:::
