---
sidebar_position: 2
title: UART
---

# UART

Serial bất đồng bộ: hai đường (**TX**, **RX**), không có clock chung — hai đầu chỉ cần thống nhất
một **baud rate**. Liên kết đơn giản và phổ biến nhất.

## Ưu & nhược

| Ưu | Nhược |
| --- | --- |
| Cực đơn giản, có trên mọi MCU | Chỉ điểm-điểm (2 thiết bị) |
| Song công (TX + RX) | Không địa chỉ, không multi-drop |
| Rẻ (không cần linh kiện thêm trên bo) | Hai đầu phải khớp baud |
| Tuyệt cho debug/log | Đơn cực → dễ nhiễu khi đi xa |
| | Không có xử lý lỗi/flow control sẵn |

## Use case

- **Console debug / log** (công dụng số 1).
- Nói chuyện với **module**: GPS, GSM/4G, Bluetooth, ESP-AT.
- Nạp firmware qua **bootloader**.
- Liên kết **bo-với-bo** ngắn.

## Yêu cầu phần cứng

- **Bắt chéo đường:** TX → RX, RX → TX, và một **đất chung**.
- **Khớp mức điện áp** (3.3 V vs 5 V) — thêm level shifter nếu khác nhau.
- Tùy chọn **RTS/CTS** (flow control phần cứng) cho tốc độ cao / receiver dễ mất byte.
- Để đi **xa hoặc nhiễu**, đừng chạy UART thô — chuyển sang **RS-232** (điểm-điểm) hoặc **RS-485**
  (dài/multi-drop) bằng transceiver.

## Yêu cầu phần mềm

- Cấu hình **baud, số bit dữ liệu, parity, stop bit** giống hệt ở hai đầu (vd 115200-8-N-1).
- Dùng RX bằng **ngắt hoặc DMA** với **ring buffer** — polling sẽ rớt byte.
- Tự định nghĩa **khung dữ liệu (framing)** (độ dài/ký tự phân tách/CRC) — UART chỉ cho bạn một
  luồng byte, không hơn.

:::caution Lỗi UART hàng đầu
Sai **baud**, thiếu **đất chung**, hoặc lệch **3.3 V↔5 V**. Kiểm ba thứ này trước khi thấy "rác".
:::

## Xem thêm

- [Tổng quan kết nối](/docs/embedded-firmware/connectivity) · [RS-485](/docs/embedded-firmware/connectivity/rs485)
- [Xây Dựng Một Sản Phẩm](/docs/embedded-firmware/building-a-product) — cầu USB-UART (CH340, CP2102)
