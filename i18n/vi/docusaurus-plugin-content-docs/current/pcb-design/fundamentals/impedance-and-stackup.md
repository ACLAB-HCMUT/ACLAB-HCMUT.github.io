---
sidebar_position: 5
title: Trở kháng & Stackup
---

# Trở kháng & Stackup

**Trở kháng đặc tính** của một đường mạch do hình học của nó và **chồng lớp (stackup)** xung quanh
quyết định. Trở kháng kiểm soát là thứ làm cho [toàn vẹn tín hiệu](/docs/pcb-design/fundamentals/signal-integrity)
và các giao tiếp tốc độ cao hoạt động được.

## Điều gì quyết định trở kháng

Với một đường cho trước, trở kháng phụ thuộc:

- **Bề rộng đường** (rộng hơn → trở kháng thấp hơn)
- **Khoảng cách tới mặt phẳng tham chiếu** (gần hơn → thấp hơn)
- **Hằng số điện môi (Dk)** của vật liệu bo
- **Độ dày đồng** và **khoảng cách đường** (đối với cặp vi sai)

Đừng tính tay — dùng công cụ tính của phần mềm EDA hoặc **bộ tính trở kháng** của xưởng, rồi xác
nhận bằng **stackup kiểm soát trở kháng** từ xưởng.

## Microstrip vs stripline

| Loại | Ở đâu | Ghi chú |
| --- | --- | --- |
| **Microstrip** | Lớp ngoài, một mặt phẳng tham chiếu bên dưới | Dễ hơn, nhanh hơn chút; phát xạ nhiều hơn |
| **Stripline** | Lớp trong, có mặt phẳng cả trên *và* dưới | Che chắn/EMI tốt hơn; cần ≥4 lớp |

## Cơ bản về stackup

- Bo **2 lớp** không làm tốt được trở kháng kiểm soát hay che chắn — ổn cho bo chậm/đơn giản,
  không dùng cho tốc độ cao.
- **4 lớp** là mức tối thiểu thực tế cho tốc độ cao: ví dụ **Signal / GND / PWR / Signal**, để mọi
  lớp tín hiệu đều có một mặt phẳng tham chiếu kề bên.
- Giữ lớp tín hiệu **kề một mặt phẳng**; giữ lớp quan trọng về trở kháng gần mặt tham chiếu của nó.

## Mục tiêu thường gặp

| Giao tiếp | Trở kháng |
| --- | --- |
| Đơn (single-ended) tổng quát | 50 Ω |
| USB 2.0 | 90 Ω vi sai |
| Ethernet / HDMI / LVDS | 100 Ω vi sai |
| USB 3 / PCIe | ~85–100 Ω vi sai |

:::tip Quyết định stackup trước
Chọn số lớp và stackup **trước khi** định tuyến net nhanh — trở kháng, đường hồi tiếp và EMI đều
phụ thuộc vào nó. Hỏi xưởng stackup kiểm soát trở kháng tiêu chuẩn của họ từ sớm.
:::

## Xem thêm

- [Tín hiệu số tốc độ cao](/docs/pcb-design/circuit-blocks/high-speed)
- [Từ thiết kế đến giao hàng](/docs/pcb-design/fabrication-and-ordering) — yêu cầu stackup kiểm soát
- [Signal Integrity](/docs/pcb-design/fundamentals/signal-integrity)
