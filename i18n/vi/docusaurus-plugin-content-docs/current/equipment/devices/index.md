---
sidebar_position: 1
title: Thiết bị
---

# Thiết bị

Thiết bị là phần cứng **chạy mã của bạn**. Trong phòng lab, chúng được chia thành hai lớp lớn,
và việc chọn đúng lớp là quyết định quan trọng nhất trong một dự án.

## MCU vs. SBC — sự khác biệt cốt lõi

| | **Vi điều khiển (MCU)** | **Máy tính bo mạch đơn (SBC / SoC)** |
| --- | --- | --- |
| Chạy | Firmware bare-metal hoặc một RTOS | Một hệ điều hành đầy đủ (thường là Linux) |
| Xung nhịp điển hình | 16–240 MHz | 1–2.4 GHz, đa nhân |
| Bộ nhớ | KB RAM, KB–MB flash | GB RAM, lưu trữ SD/eMMC/SSD |
| Thời gian khởi động | Vài micro giây | Vài chục giây |
| Điểm mạnh | Định thời thời gian thực, công suất thấp, điều khiển chân trực tiếp | Tính toán nặng, kết nối mạng, thị giác, đa nhiệm |
| Ví dụ | STM32, ESP32, AVR | Raspberry Pi, NVIDIA Jetson |

:::tip Quy tắc bỏ túi
Nếu tác vụ là **"phản ứng với một chân trong vòng vài micro giây"** → MCU. Nếu là **"chạy một chương trình
cần hệ thống tệp, mạng, hoặc một camera + mô hình"** → SBC. Nhiều dự án thực tế dùng **cả hai**:
một SBC làm bộ não, một MCU lo phần I/O chính xác.
:::

## Trong phần này

- [**Vi điều khiển (MCU)**](/docs/equipment/devices/microcontrollers) — STM32, ESP32, Arduino/AVR.
- [**Máy tính bo mạch đơn (SBC / SoC)**](/docs/equipment/devices/single-board-computers) — Raspberry Pi 3/4/5, NVIDIA Jetson.

:::note
Để tìm hiểu sâu hơn các chủ đề về firmware (RTOS, driver, ngoại vi) hãy xem
[Firmware nhúng](/docs/embedded-firmware). Hướng dẫn này tập trung vào *phần cứng* và cách
bắt đầu với nó.
:::
