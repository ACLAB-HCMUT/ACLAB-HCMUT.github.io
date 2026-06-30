---
sidebar_position: 6
title: Transistor & MOSFET
---

# Transistor & MOSFET

Linh kiện đóng cắt và khuếch đại chủ động. Trên bo số, chúng chủ yếu dùng làm **công tắc** — bật/
tắt nguồn hoặc tải.

## BJT vs MOSFET

| | BJT | MOSFET |
| --- | --- | --- |
| Điều khiển bằng | **Dòng** (base) | **Điện áp** (gate) |
| Trạng thái dẫn | Sụt Vce(sat) | Điện trở **Rds(on)** thấp |
| Dùng cho | Đóng cắt tín hiệu nhỏ, dịch mức | Đóng cắt công suất, load switch |

Để đóng cắt công suất, **MOSFET** thắng (tổn hao thấp). N-channel cho low-side, P-channel (hoặc
driver high-side) cho high-side.

## Mạch MOSFET thông dụng

- **Công tắc low-side** — N-FET giữa tải và GND; MCU lái gate (thêm điện trở gate và pull-down
  gate để tắt khi khởi động).
- **Load switch / high-side** — P-FET (hoặc IC load-switch chuyên dụng) để đóng cắt một đường
  nguồn gọn gàng, thường kèm kiểm soát inrush.
- **Chống ngược cực** — một P-FET trên đường nguồn, tổn hao thấp hơn diode.
- **Dịch mức** — một N-FET nhỏ + hai pull-up dịch mức I²C hai chiều giữa các miền điện áp.

## Cơ bản về gate-drive

- Gate có tính **điện dung** — lái nhanh cần dòng. Để đóng cắt công suất, dùng **gate driver** đúng
  nghĩa; giữ **vòng gate ngắn** (xem
  [Điện tử công suất](/docs/pcb-design/circuit-blocks/power-electronics)).
- Luôn xác định gate khi cấp nguồn (pull-down/up) để FET không bật ngẫu nhiên.

:::caution Gate mức logic
Một MOSFET thường có thể cần 10 V trên gate để dẫn hoàn toàn. Để MCU 3.3 V/5 V điều khiển, chọn
MOSFET **mức logic (logic-level)** (dẫn đủ ở ~2.5–4.5 V), nếu không nó sẽ nóng và dẫn một phần.
:::

## Xem thêm

- [Quản lý nguồn](/docs/pcb-design/applied-circuits/power-management) — load switch, arbiter
- [Điện tử công suất & Dòng lớn](/docs/pcb-design/circuit-blocks/power-electronics)
