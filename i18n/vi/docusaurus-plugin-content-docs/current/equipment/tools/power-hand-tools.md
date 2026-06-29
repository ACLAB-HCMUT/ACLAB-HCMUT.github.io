---
sidebar_position: 2
title: Công cụ điện & cầm tay
---

# Công cụ điện & cầm tay

Mọi thứ bạn cần để **cấp nguồn** cho một mạch điện và để **chế tạo hoặc sửa chữa** nó về mặt vật lý.

## Nguồn bàn (DC)

Nguồn bàn cung cấp cho bạn một nguồn DC điều chỉnh được, có giới hạn dòng — an toàn hơn nhiều so với một
adapter cắm tường khi làm nguyên mẫu.

- **Đặt điện áp** theo định mức của mạch *trước khi* kết nối nó.
- **Đặt giới hạn dòng** ở mức thấp trước; một giới hạn hợp lý sẽ biến một lỗi đấu dây thành tình huống vô hại
  "nguồn vào chế độ CC" thay vì làm cháy linh kiện hoặc bốc khói.

:::tip Giới hạn dòng là tấm lưới an toàn của bạn
Trên một bo mạch mới, hãy đặt giới hạn dòng cao hơn một chút so với mức tiêu thụ dự kiến. Nếu nguồn chạm tới giới hạn
(chế độ dòng không đổi - constant-current) ngay khi bạn cấp nguồn, thì bạn có một điểm chập — hãy tắt nguồn và kiểm tra
trước khi đi tiếp.
:::

## Trạm hàn

Một mỏ hàn được kiểm soát nhiệt độ để nối linh kiện và sửa chữa bo mạch.

- Thiếc hàn có chì điển hình chảy ở khoảng **300–350 °C**; thiếc không chì cần nóng hơn một chút.
- Giữ đầu mỏ hàn được **tráng thiếc (tinned)** và sạch (len đồng / bọt biển ẩm) — một đầu mỏ hàn đen, bị oxy hóa sẽ không
  truyền nhiệt được.
- Dùng flux để mối hàn sạch; một mối hàn tốt phải bóng và lõm, không phải một cục thiếc xỉn màu.

:::danger An toàn khi hàn
Mỏ hàn và vật hàn nóng đủ để gây bỏng ngay lập tức. **Hãy dùng hệ thống hút khói / thông gió**,
đeo bảo vệ mắt, không bao giờ để mỏ hàn nóng không có người trông, và đặt nó về giá đỡ. Xem
[Nội quy & An toàn phòng lab](/docs/lab-rules).
:::

:::caution ESD
Các linh kiện nhạy cảm (MCU, SoC, MOSFET) có thể bị giết bởi tĩnh điện mà bạn thậm chí không cảm nhận được. Hãy dùng
**vòng đeo cổ tay chống tĩnh điện** và thảm chống tĩnh điện khi thao tác với bo mạch trần và IC.
:::

## Sửa chữa bằng khí nóng (Hot-air rework)

Dành cho các linh kiện dán bề mặt (SMD) và việc tháo/thay chip. Kiểm soát **nhiệt độ khí và lưu lượng
khí**; che chắn các linh kiện lân cận và làm nóng trước các bo mạch lớn để các mối hàn reflow đều.

## Công cụ cầm tay

| Công cụ | Công dụng |
| --- | --- |
| Kìm tuốt dây / kìm cắt sát (flush cutters) | Chuẩn bị và cắt tỉa dây và chân linh kiện |
| Tua vít chính xác | Vỏ hộp, header, giá đỡ |
| Nhíp (an toàn ESD) | Đặt linh kiện SMD |
| Helping hands / ê tô | Giữ bo mạch khi hàn |
| Ống co nhiệt + súng nhiệt | Cách điện và chống đứt mối nối |

:::info Vật tư tiêu hao
Hãy ghi nhật ký khi bạn dùng hết các vật tư tiêu hao dùng chung (thiếc, flux, ống co nhiệt, wick) để chúng được
bổ sung lại — xem [chính sách sử dụng](/docs/equipment).
:::
