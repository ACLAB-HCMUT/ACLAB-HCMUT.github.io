---
sidebar_position: 4
title: IoT Solutions
---

# IoT Solutions

Các **bản thiết kế (blueprint) giải pháp IoT đầu-cuối (end-to-end) tiêu biểu** — những hệ thống hoàn chỉnh xây dựng trên
[mẫu hình IoT](/docs/iot-applications) (cảm biến → kết nối → xử lý → tác động). Mỗi giải pháp ghép các cảm biến hiện trường
qua RS485/Modbus với một edge gateway (Raspberry Pi hoặc lớp ESP32) và một dashboard đám mây có
cảnh báo. Chúng cho thấy các khối xây dựng trong [Building a Product](/docs/embedded-firmware/building-a-product)
kết hợp lại thành một hệ thống có thể triển khai như thế nào.

## Giám sát chất lượng nước ao nuôi tôm

Giữ ao nuôi thủy sản khỏe mạnh suốt ngày đêm — xem [Environmental Monitoring](/docs/iot-applications/environmental-monitoring#aquaculture-water-quality).

- **Giám sát:** pH, độ dẫn điện (EC), oxy hòa tan (DO), ammonia (NH₄), nhiệt độ — qua các đầu dò công nghiệp RS485.
- **Kết nối / xử lý:** gateway lớp Pi → dashboard SCADA trên đám mây.
- **Tác động:** giám sát 24/7, cảnh báo ngưỡng (email/Telegram), báo cáo lịch sử.
- **Lợi ích:** phát hiện sớm các biến động nguy hiểm của DO/pH, ngăn dịch bệnh và mất đàn nuôi.

## Giám sát năng lượng tòa nhà & điều khiển thiết bị

Cắt giảm lãng phí năng lượng và quản lý thiết bị từ xa trên toàn tòa nhà.

- **Giám sát:** công suất theo từng khu vực — điện áp, dòng điện, dòng rò.
- **Điều khiển:** đèn, quạt và máy lạnh (điều khiển IR) cùng các cầu dao thông minh, qua RS485 Modbus → gateway ESP32 → đám mây.
- **Lợi ích:** hiển thị năng lượng theo từng khu vực theo thời gian thực, cảnh báo sự cố điện, tự động hóa trình tự bật/tắt máy lạnh, điều khiển nhiều phòng mà không cần đến tận nơi.

## Giám sát phòng data-center

Bảo vệ hạ tầng trọng yếu bằng các cảnh báo chủ động.

- **Giám sát:** nhiệt độ, độ ẩm, **phát hiện rò rỉ nước (water-leak)**, công suất (điện áp & dòng của UPS/máy phát), sự kiện ra/vào cửa.
- **Tác động:** cảnh báo bất thường theo thời gian thực (email/Telegram), điều khiển HVAC/UPS, dashboard web có log.
- **Lợi ích:** ngăn downtime, phát hiện vấn đề trước khi leo thang, kiểm toán việc ra/vào.

## Trạm quan trắc môi trường

Một trạm đầy đủ cho dữ liệu hiện trường/nông nghiệp/chất lượng không khí — xem [Environmental Monitoring](/docs/iot-applications/environmental-monitoring).

- **Giám sát:** không khí (nhiệt độ, độ ẩm, áp suất, ánh sáng, **tiếng ồn**, **PM2.5/PM10**), thời tiết (tốc độ/hướng gió, lượng mưa), bức xạ mặt trời, đất (nhiệt độ, độ ẩm, EC, pH, NPK).
- **Kết nối:** RS485 → gateway ESP32-S3 → **4G / Wi-Fi / Ethernet** → đám mây; cảnh báo qua email/Telegram/SMS.
- **Lợi ích:** ra quyết định cục bộ, theo thời gian thực, dựa trên dữ liệu (so với dự báo chung chung); cảnh báo sớm; tích hợp với tự động hóa như tưới tiêu.

:::note Bản thiết kế, không phải catalog
Những mục này mô tả cách các giải pháp như vậy được xây dựng để thành viên có thể tự thiết kế của riêng mình. Các chi tiết cụ thể
(cảm biến, ngưỡng, dashboard) thay đổi theo từng lần triển khai.
:::

## References

- [Shrimp-pond water quality](https://epcb.vn/products/giai-phap-giam-sat-chat-luong-nuoc-ao-nuoi-tom) ·
  [Building energy & control](https://epcb.vn/products/giai-phap-giam-sat-nang-luong-va-dieu-khien-thiet-bi-toa-nha) ·
  [Data-center monitoring](https://epcb.vn/products/giai-phap-giam-sat-phong-data-center) ·
  [Environmental station](https://epcb.vn/products/giai-phap-tram-quan-trac-moi-truong) (EPCB)
