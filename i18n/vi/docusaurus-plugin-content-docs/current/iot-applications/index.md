---
slug: /iot-applications
sidebar_position: 1
title: IoT Applications
---

# IoT Applications

Internet of Things (IoT) kết nối các **cảm biến và cơ cấu chấp hành** vật lý với mạng và
phần mềm, để chúng ta có thể **giám sát và điều khiển thế giới thực** từ xa và tự động. Phần
này phác họa các lĩnh vực ứng dụng phổ biến cùng những mô hình đứng sau chúng. Để thực hành
các kiến thức cơ bản, xem [IoT course](/courses/iot).

## Mô hình IoT

Hầu hết mọi hệ thống IoT đều tuân theo cùng một chuỗi — nhận ra nó thì bất kỳ ứng dụng nào cũng trở nên quen thuộc:

```
Sense → Connect → Process → Act / Visualize
```

| Giai đoạn | Chức năng | Công nghệ điển hình |
| --- | --- | --- |
| **Sense** | Đọc thế giới vật lý | Cảm biến + MCU / thiết bị biên (ESP32, STM32) |
| **Connect** | Đưa dữ liệu lên nền tảng | Wi-Fi, BLE, **LoRa/LoRaWAN**, NB-IoT/LTE-M, di động, Zigbee |
| **Process** | Lọc, lưu trữ, phân tích | Xử lý tại biên + nền tảng đám mây (ví dụ CoreIOT/ThingsBoard) |
| **Act / Visualize** | Khép vòng điều khiển hoặc thông báo cho con người | Cơ cấu chấp hành, cảnh báo, bảng điều khiển, **bản đồ (GIS)** |

→ Phần cứng giúp hiện thực hóa điều này được trình bày trong [Building a Product](/docs/embedded-firmware/building-a-product).

## Các năng lực xuyên suốt

Những năng lực này xuất hiện trong *mọi* lĩnh vực bên dưới:

### Thu thập dữ liệu & lập bản đồ (GIS)

- **Gắn tọa độ địa lý** cho mỗi giá trị đo và đặt cảm biến lên bản đồ; xây dựng **bản đồ nhiệt (heatmap)** và theo dõi các tài sản di động.
- Kết hợp nhiều nút thành một bức tranh trực tiếp duy nhất về một khu vực (công trường, trang trại, thành phố).

### Điều khiển tự động

- **Vòng kín:** cảm biến → quyết định theo luật/AI → cơ cấu chấp hành (ví dụ độ ẩm đất → van tưới).
- **Điều khiển từ xa & lập lịch**, với các khóa liên động an toàn và khả năng can thiệp thủ công.

### Edge AI

- Suy luận ngay trên thiết bị (phát hiện bất thường, thị giác, phân loại âm thanh) giúp giảm băng thông và
  độ trễ — xem [AI / Edge AI](/docs/ai-edge).

## Các lĩnh vực ứng dụng

| Lĩnh vực | Ví dụ |
| --- | --- |
| [**Environmental Monitoring**](/docs/iot-applications/environmental-monitoring) | Công trường xây dựng, nơi làm việc, nông nghiệp, nuôi trồng thủy sản, động vật hoang dã |
| [**Smart Infrastructure & Logistics**](/docs/iot-applications/smart-infrastructure) | Chiếu sáng đường phố, kho bãi, tòa nhà/thành phố |
| [**IoT Solutions**](/docs/iot-applications/solutions) | Các giải pháp hoàn chỉnh (ao tôm, năng lượng tòa nhà, data center, trạm quan trắc) |

:::tip Cùng mô hình, khác cảm biến
Hầu hết các dự án IoT chỉ khác nhau ở **cảm biến nào** và **kết nối nào** mà chúng dùng — bộ
khung sense→connect→process→act vẫn giữ nguyên. Làm chủ nó một lần và bạn có thể xây dựng bất kỳ ứng dụng nào trong số này.
:::
