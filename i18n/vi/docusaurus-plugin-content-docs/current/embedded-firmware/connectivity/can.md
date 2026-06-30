---
sidebar_position: 4
title: CAN bus
---

# CAN bus

**Controller Area Network** — một bus vi sai, đa master, bền bỉ, thiết kế cho môi trường nhiễu của
ô tô/công nghiệp. Thiết bị phát **thông điệp (message)** theo ID (không theo địa chỉ) và phần cứng
**arbitration** quyết định ưu tiên.

## Ưu & nhược

| Ưu | Nhược |
| --- | --- |
| Rất **chống nhiễu** (vi sai, cặp xoắn) | Cần controller **và** transceiver |
| **Đa master**, không có điểm điều khiển duy nhất | Tốc độ thô vừa phải (1 Mbps cổ điển; CAN-FD nhanh hơn) |
| **Arbitration** có ưu tiên (không mất khung do va chạm) | Yêu cầu **termination** đúng |
| **Phát hiện lỗi** mạnh + tự truyền lại | Cấu hình phần mềm nhiều hơn UART/I²C |
| Tốt qua **hàng chục mét** | |

## Use case

- **Ô tô** (nguồn gốc), **robot**, **tự động hóa công nghiệp**, mạch lái động cơ, mạng cảm biến/cơ
  cấu chấp hành phân tán nơi độ tin cậy quan trọng.

## Yêu cầu phần cứng

- Một **CAN controller** (tích hợp trong nhiều MCU) **+ một CAN transceiver** (vd TJA1050, MCP2551).
- **Cặp xoắn** CANH/CANL với **termination 120 Ω ở cả hai đầu** bus.
- Tham chiếu đất chung; **cách ly galvanic** cho đoạn dài hoặc khác điện thế đất.

## Yêu cầu phần mềm

- Cấu hình **bit timing** (điểm lấy mẫu) — phải khớp trên mọi node.
- Thiết lập **ID thông điệp**, **bộ lọc/mask**, và mailbox TX/RX.
- Xử lý lỗi và **khôi phục bus-off**.
- Tùy chọn giao thức lớp trên: **CANopen**, **J1939**.

:::caution Lỗi CAN hàng đầu
**Termination** sai/thiếu (một 120 Ω ở mỗi đầu — không nhiều hơn), **lệch bit-timing** giữa các
node, hoặc **không có transceiver**. Chênh lệch đất giữa các node xa cũng làm hỏng dữ liệu — hãy cách ly.
:::

## Xem thêm

- [Tín hiệu vi sai](/docs/embedded-firmware/connectivity/differential-signaling)
- [RS-485](/docs/embedded-firmware/connectivity/rs485)
- [Xây Dựng Một Sản Phẩm](/docs/embedded-firmware/building-a-product) — CAN transceiver
