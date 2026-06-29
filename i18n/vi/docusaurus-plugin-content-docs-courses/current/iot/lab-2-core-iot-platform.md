---
sidebar_position: 3
title: 'Lab 2: Nền tảng Core-IoT'
---

# Lab 2: Nền tảng Core-IoT

## Tổng quan

Core IoT (xây dựng trên **ThingsBoard**) đảm nhận việc quản lý thiết bị, trực quan hóa dữ liệu và
phân tích thời gian thực. Bài lab này kết nối một ESP32-S3 với nền tảng, gửi telemetry, và xây
dựng một dashboard tương tác.

## Kết quả học tập

- Gửi dữ liệu telemetry và trực quan hóa trên các dashboard ThingsBoard.
- Triển khai các rule chain cơ bản cho tự động hóa hướng sự kiện.

## Yêu cầu

- Tạo một dự án PlatformIO trong VSCode và tích hợp board ESP32 (bạn có thể clone
  [ESP32 template](https://github.com/ACLAB-HCMUT/PlatformIO_Arduino-Framework_ESP32_Template)).
- Đọc nhiệt độ/độ ẩm từ DHT20 và hiển thị trên một dashboard mẫu của CoreIOT.
- Hoàn thành tất cả các tác vụ theo chuẩn **RTOS**, và tạo một **scheduler**.

## Hướng dẫn

1. Cài đặt VSCode + plugin PlatformIO; biên dịch template và nạp firmware cho ESP32-S3.
2. Kết nối DHT20 với board qua I²C; đo nhiệt độ/độ ẩm mỗi 5 s.
3. Tạo một dashboard trong CoreIOT và hiển thị dữ liệu.
4. Triển khai một scheduler (xem tài liệu ThingsBoard
   [Scheduler docs](https://thingsboard.io/docs/pe/user-guide/scheduler/)).

## Câu hỏi

- Những giao thức nào có thể kết nối thiết bị với ThingsBoard, và ưu điểm của chúng là gì?
- Sự khác biệt giữa shared attributes và client attributes là gì, và khi nào nên dùng mỗi loại?
