---
sidebar_position: 3
title: Smart Infrastructure & Logistics
---

# Smart Infrastructure & Logistics

Áp dụng [IoT pattern](/docs/iot-applications) cho **hạ tầng và vận hành** — giúp các hệ thống
hiện có trở nên quan sát được, điều khiển được và hiệu quả hơn.

## Chiếu sáng đường phố thông minh

Đèn có kết nối giúp tiết kiệm năng lượng và tự bảo trì.

- **Điều khiển:** lịch giảm sáng, độ sáng **thích ứng theo chuyển động/lưu lượng**, bật/tắt từ xa.
- **Giám sát:** **báo lỗi** theo từng đèn (một đèn hỏng sẽ tự báo cáo), đo đếm năng lượng.
- **Lợi ích:** tiết kiệm năng lượng lớn và giảm đáng kể việc kiểm tra thủ công trên toàn thành phố/khuôn viên.

## Quản lý kho bãi & logistics

Khả năng quan sát đầu-cuối đối với hàng hóa, tài sản và điều kiện.

- **Theo dõi tài sản & tồn kho:** thẻ RFID / BLE, định vị/phân vùng, mức tồn kho.
- **Chuỗi lạnh:** ghi nhật ký nhiệt độ & độ ẩm cho hàng hóa nhạy cảm, kèm báo động.
- **Vận hành:** dữ liệu đo từ xe nâng/AGV, trạng thái cổng/bến bốc dỡ, **bảo trì dự đoán** thiết bị.
- **Lợi ích:** ít thất lạc hàng hơn, ít hư hỏng hơn, lưu thông hàng hóa trơn tru hơn.

## Tòa nhà & thành phố thông minh

- **Tòa nhà:** điều khiển HVAC và chiếu sáng, mức độ chiếm dụng, đo đếm năng lượng chi tiết, cảnh báo rò rỉ/khói.
- **Thành phố:** đỗ xe thông minh, mức đầy thùng rác, chất lượng nước/không khí, cảm biến ngập lụt.

## Điều khiển tự động trong hạ tầng

- **Điều khiển vòng kín** ở quy mô lớn (ví dụ chiếu sáng phản ứng theo ánh sáng môi trường + sự hiện diện).
- **Kích hoạt từ xa & lập lịch** với **khóa liên động an toàn** và khả năng can thiệp thủ công.
- Ngày càng được **hỗ trợ bởi edge-AI** (ví dụ phát hiện tắc nghẽn hoặc bất thường ngay tại chỗ) — xem [AI / Edge AI](/docs/ai-edge).

:::tip Cải tạo (retrofit) tốt hơn là phá bỏ và thay mới
Phần lớn giá trị này đến từ việc thêm cảm biến/bộ điều khiển vào hạ tầng **hiện có** thay vì
thay thế nó — một nút chi phí thấp trên mỗi đèn hoặc kệ hàng thường là đủ.
:::

:::caution Quy mô làm thay đổi vấn đề
Ở quy mô hàng trăm–hàng nghìn nút, **quản lý thiết bị, bảo mật và nguồn điện/kết nối** sẽ chi phối
thiết kế — hãy lên kế hoạch cho việc cấp phát, cập nhật ([OTA](/docs/embedded-firmware/advanced-topics)) và
giám sát ngay từ ngày đầu.
:::
