---
slug: /equipment
title: Hướng dẫn thiết bị phòng lab
---

# Hướng dẫn thiết bị phòng lab

Một tài liệu tham khảo thực tế cho phần cứng và công cụ dùng chung trong phòng lab — mỗi thứ là gì,
khi nào nên dùng đến, và cách sử dụng an toàn và đúng cách.

Hướng dẫn được chia thành hai nhóm:

| Nhóm | Bên trong có gì |
| --- | --- |
| [**Thiết bị (Devices)**](/docs/equipment/devices) | Những thứ *chạy mã của bạn* — vi điều khiển (MCU) và máy tính bo mạch đơn (SBC / SoC). |
| [**Công cụ (Tools)**](/docs/equipment/tools) | Những thứ bạn *dùng lên* thiết bị — công cụ điện & cầm tay, dụng cụ đo, và bộ nạp/gỡ lỗi (programmer/debugger). |

## "Tôi cần cái nào?" — chọn nhanh

- **Đọc cảm biến, nhấp nháy LED, điều khiển động cơ, định thời thời gian thực ngặt nghèo** → một [vi điều khiển](/docs/equipment/devices/microcontrollers).
- **Chạy Linux, một camera + mô hình thị giác, một dịch vụ web, hoặc ROS 2** → một [máy tính bo mạch đơn](/docs/equipment/devices/single-board-computers).
- **Nạp / gỡ lỗi firmware** → một [bộ nạp / gỡ lỗi](/docs/equipment/tools/programmers-debuggers) (ST-Link, J-Link, USB-UART).
- **"Chân này thực sự là 3.3 V chứ?" / "tại sao tín hiệu này lại sai?"** → một [dụng cụ đo](/docs/equipment/tools/measurement-instruments) (multimeter, oscilloscope, logic analyzer).

## Chính sách sử dụng

:::info Quy tắc ứng xử với tài nguyên dùng chung
- **Đặt lịch (book)** trước khi dùng các thiết bị dùng chung/đắt tiền, và **ghi nhật ký (log)** các sự cố và việc sử dụng vật tư tiêu hao.
- **Trả** dụng cụ về đúng chỗ; rời đi với bàn làm việc sạch hơn lúc bạn đến.
- Đừng mang phần cứng ra khỏi phòng lab khi chưa được phép.
:::

:::danger An toàn là trên hết
Trước khi chạm vào nguồn điện, hàn, hoặc bất kỳ phần cứng chuyển động nào, hãy đọc
**[Nội quy & An toàn phòng lab](/docs/lab-rules)**. Tắt nguồn trước khi đấu dây, kiểm tra cực tính và
điện áp trước khi cấp nguồn, và xử lý pin LiPo/Li-ion một cách cẩn thận.
:::

> Thêm một thiết bị mới? Hãy theo cấu trúc trang: **Là gì → Khi nào dùng → Thông số → Thiết lập →
> Lỗi thường gặp**, và ưu tiên chính xác hơn là ấn tượng.
