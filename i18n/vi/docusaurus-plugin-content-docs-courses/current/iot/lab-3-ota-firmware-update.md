---
sidebar_position: 4
title: 'Lab 3: Cập nhật Firmware qua OTA'
---

# Lab 3: Cập nhật Firmware qua OTA

## Tổng quan

Cập nhật qua mạng (OTA) cho phép bạn nâng cấp firmware của thiết bị từ xa — không cần truy cập
vật lý — điều này thiết yếu để duy trì các đội thiết bị IoT đã triển khai. Bài lab này bổ sung
OTA cho thiết bị giám sát nhiệt độ/độ ẩm từ các bài lab trước.

## Yêu cầu

Thiết kế và triển khai một hệ thống cập nhật OTA cho một thiết bị IoT trên nền tảng Core-IoT, sử
dụng ESP32 / ESP32-S3 và cảm biến DHT20 / DHT11.

## Cách tiếp cận

1. Thiết lập ESP32 với firmware đọc dữ liệu cảm biến và gửi lên một dashboard IoT.
2. Triển khai cơ chế cập nhật OTA qua **HTTP** hoặc **MQTT**; triển khai một update server và
   host một phiên bản firmware mới.
3. Kích hoạt cập nhật từ xa và xác nhận firmware mới chạy đúng.

## Kế hoạch kiểm thử

- **Kiểm thử tải firmware:** tải một phiên bản mới lên server và kích hoạt cập nhật OTA.
- **Kiểm tra tính toàn vẹn dữ liệu:** xác nhận nhiệt độ/độ ẩm vẫn được truyền đúng sau khi cập nhật.

## Bảo mật (chỉ thiết kế)

Trình bày các giải pháp của bạn (không yêu cầu triển khai): ký và xác thực firmware trước khi cài
đặt, và xác thực để ngăn các cập nhật trái phép.

## Câu hỏi

- Những biện pháp bảo mật nào ngăn chặn các cập nhật OTA trái phép?
- Cơ chế của bạn xử lý gián đoạn mạng như thế nào?
- Bạn xác minh tính toàn vẹn của firmware mới trước khi áp dụng bằng cách nào?
