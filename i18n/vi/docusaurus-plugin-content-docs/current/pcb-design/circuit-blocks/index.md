---
sidebar_position: 1
title: Thiết kế theo khối mạch
---

# Thiết kế theo khối mạch

Một bo mạch thực tế không phải một mạch duy nhất — nó gồm **nhiều khối**, mỗi khối có quy tắc
layout riêng. Mạch nguồn quan tâm diện tích vòng dòng và nhiệt; bus tốc độ cao quan tâm trở kháng
và đường hồi tiếp dòng; MCU quan tâm decoupling và xung clock sạch. "Thiết kế cả bo theo cùng một
kiểu" chính là cách làm bo mạch hỏng.

Phần này phân loại các khối thường gặp và liên kết tới hướng dẫn riêng cho từng khối.

## Phân loại

| Khối | Xử lý gì | Mối quan tâm chính | Trang |
| --- | --- | --- | --- |
| **MCU & Số (Digital)** | Vi điều khiển, logic, bộ nhớ | Decoupling, clock, reset/boot, nạp chương trình | [MCU & Digital](/docs/pcb-design/circuit-blocks/mcu-and-digital) |
| **Mạch nguồn** | Ổn áp LDO / buck / boost | Diện tích vòng, hồi tiếp, nhiệt, nhiễu | [Mạch nguồn](/docs/pcb-design/circuit-blocks/power-supply) |
| **Điện tử công suất** | Dòng lớn, điều khiển động cơ, FET đóng cắt | Đồng/nhiệt, gate drive, cách ly | [Điện tử công suất](/docs/pcb-design/circuit-blocks/power-electronics) |
| **Số tốc độ cao** | USB, Ethernet, HDMI, MIPI, DDR | Trở kháng, khớp chiều dài, đường hồi tiếp | [Tín hiệu tốc độ cao](/docs/pcb-design/circuit-blocks/high-speed) |
| **Analog & tín hiệu hỗn hợp** | ADC/DAC, cảm biến, op-amp | Nối đất, sắp đặt, tham chiếu, nhiễu | [Analog & Mixed-Signal](/docs/pcb-design/circuit-blocks/analog-mixed-signal) |

## Cách dùng

1. **Chia sơ đồ thành các khối** — cây nguồn, MCU, từng giao tiếp, mặt analog.
2. **Thiết kế mỗi khối theo quy tắc riêng** của nó (các trang ở trên).
3. **Để ý giao diện giữa các khối** — trình tự cấp nguồn, đất dùng chung, chỗ một đường tốc độ
   cao cắt qua khe của mặt phẳng, chỗ một bộ ổn áp xung nằm cạnh ADC.

:::tip Bắt đầu từ cây nguồn
Trước khi sắp đặt linh kiện, hãy phác **cây nguồn** (mọi mức điện áp, nguồn của nó, và dòng tiêu
thụ). Phần lớn quyết định layout và nối đất đều suy ra từ đó.
:::

## Xem thêm

- [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes)
- [Nguồn tham khảo & Reference Design](/docs/pcb-design/reference-designs) — học từ các bo mở thực tế
- [Từ thiết kế đến giao hàng](/docs/pcb-design/fabrication-and-ordering)
