---
sidebar_position: 1
slug: /iot
title: Internet of Things
---

# Internet of Things (IoT)

Một khóa thực hành IoT: đọc dữ liệu từ cảm biến trên **ESP32 / ESP32-S3**, gửi telemetry lên
nền tảng **CoreIOT (ThingsBoard)**, trực quan hóa trên các dashboard, và cập nhật firmware
qua mạng (OTA). Các dự án được xây dựng bằng **PlatformIO** trong VSCode và tuân theo thực hành RTOS.

## Phần cứng & Công cụ

- Board phát triển **ESP32 / ESP32-S3**.
- Cảm biến nhiệt độ & độ ẩm **DHT20 / DHT11** (DHT20 qua I²C), cùng các đầu nối.
- **PlatformIO** (VSCode) — biên dịch & nạp firmware. Template:
  [PlatformIO_Arduino-Framework_ESP32_Template](https://github.com/ACLAB-HCMUT/PlatformIO_Arduino-Framework_ESP32_Template).
- **CoreIOT / ThingsBoard** — quản lý thiết bị, dashboard, rule chain.

## Các bài lab

| Lab | Chủ đề |
| --- | --- |
| [Lab 1](/courses/iot/lab-1-temp-humidity) | Cảm biến Nhiệt độ & Độ ẩm |
| [Lab 2](/courses/iot/lab-2-core-iot-platform) | Nền tảng Core-IoT |
| [Lab 3](/courses/iot/lab-3-ota-firmware-update) | Cập nhật Firmware qua OTA |

## Bắt đầu

Chạy ví dụ "Hello World" để kiểm tra board, sau đó chạy ví dụ DHT20 để xác nhận cảm biến hoạt
động (in các giá trị đọc được ra serial monitor) trước khi xây dựng giải pháp hoàn chỉnh.
