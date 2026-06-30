---
sidebar_position: 2
title: Environmental Monitoring
---

# Environmental Monitoring (Quan trắc)

Cảm biến liên tục các điều kiện vật lý để bảo vệ con người, tuân thủ quy định, tối ưu hóa
sản xuất và nghiên cứu tự nhiên. Tất cả đều chia sẻ chung [IoT pattern](/docs/iot-applications) —
chúng chủ yếu khác nhau ở *cái gì* được đo và *nơi nào* chúng vận hành.

## Quan trắc công trường xây dựng

Theo dõi các điều kiện trên và xung quanh công trường để đảm bảo **an toàn và tuân thủ**.

- **Đo:** bụi (PM2.5/PM10), tiếng ồn, độ rung, chất lượng không khí (CO, VOC), thời tiết (gió/mưa).
- **Vì sao:** bảo vệ công nhân và người dân lân cận, đáp ứng các giới hạn môi trường, lập hồ sơ tuân thủ.
- **Hành động:** cảnh báo thời gian thực khi vượt ngưỡng; tự động ghi nhật ký để lập báo cáo.

## Môi trường nơi làm việc / nghề nghiệp

Giám sát môi trường mà công nhân tiếp xúc trong nhà.

- **Đo:** nhiệt độ & độ ẩm, **mức tiếng ồn**, **bụi/hạt mịn**, khí (CO, CO₂), ánh sáng.
- **Vì sao:** sức khỏe & an toàn của công nhân, tuân thủ vệ sinh lao động, sự thoải mái/năng suất.
- **Hành động:** điều khiển thông gió, đèn/còi cảnh báo, nhật ký phơi nhiễm theo ca.

## Nông nghiệp thông minh

Canh tác dựa trên dữ liệu giúp tiết kiệm nước và cải thiện năng suất.

- **Đo:** độ ẩm & nhiệt độ đất, nhiệt độ/độ ẩm không khí, ánh sáng, lượng mưa, độ ẩm trên lá.
- **Hành động:** **tưới tiêu tự động**, điều khiển khí hậu nhà kính, cảnh báo sương giá/nắng nóng.
- **Lưu ý:** đồng ruộng rộng và xa → ưu tiên **LoRaWAN** + năng lượng mặt trời + nút tiêu thụ điện thấp.

## Nuôi trồng thủy sản (chất lượng nước)

Giữ cho ao cá/tôm khỏe mạnh và giảm thiệt hại.

- **Đo:** oxy hòa tan (DO), pH, nhiệt độ, độ mặn, độ đục, ammonia.
- **Hành động:** điều khiển **máy sục khí** và máy cho ăn; báo động khi DO/pH dao động nguy hiểm (thường vào ban đêm).
- **Lưu ý:** cảm biến chống nước/bền bỉ, hiệu chuẩn và bám bẩn sinh học (biofouling) là những thách thức thực tế.

## Quan trắc & bảo tồn động vật hoang dã / môi trường sống

Nghiên cứu và bảo vệ động vật cùng các hệ sinh thái.

- **Đo / thu thập:** **vòng cổ GPS/định vị** cho động vật, **bẫy ảnh (camera trap)**, cảm biến âm thanh (tiếng chim/dơi/côn trùng), khí hậu môi trường sống.
- **Vì sao:** nghiên cứu đa dạng sinh học, chống săn trộm, nghiên cứu di cư và tập tính.
- **Lưu ý:** **tiêu thụ điện cực thấp** và **tầm phủ xa** (LoRa, vệ tinh/di động), bền bỉ & chống chịu thời tiết, tuổi thọ pin rất dài.

## Thiết bị đo chuyên dụng & tích hợp GIS

- **Tích hợp IoT vào các thiết bị chuyên dụng** — biến một máy đo độc lập thành một thiết bị
  có kết nối, ghi nhật ký và đọc được từ xa.
- **Hiệu chuẩn & kiểm chứng dữ liệu** rất quan trọng: một cảm biến chưa được kiểm chứng tạo ra những con số vô nghĩa nhưng đầy tự tin.
- **Tích hợp bản đồ (GIS):** gắn tọa độ địa lý cho các giá trị đo và đưa vào một bản đồ/heatmap trực tiếp để các mẫu hình không gian
  (vệt ô nhiễm, vùng khô hạn) trở nên trực quan.

:::caution Vùng xa = ưu tiên nguồn điện + kết nối trước
Với công trường, trang trại và nơi hoang dã, hãy giải quyết **nguồn điện (năng lượng mặt trời/pin + thiết kế tiêu thụ thấp)** và
**kết nối (LoRa/di động/vệ tinh)** trước khi nghĩ đến tính năng. Một nút bị hết pin hoặc im lặng
sẽ chẳng thu thập được dữ liệu nào.
:::

:::tip Hiệu chuẩn rồi mới tin
Các quyết định về môi trường phụ thuộc vào những con số này. Hãy hiệu chuẩn cảm biến, kiểm tra hợp lý các dải giá trị, và đánh dấu
hiện tượng trôi (drift) — dữ liệu sai còn tệ hơn không có dữ liệu.
:::
