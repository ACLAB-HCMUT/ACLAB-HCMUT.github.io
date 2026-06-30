---
sidebar_position: 6
title: Analog & Tín hiệu hỗn hợp
---

# Analog & Tín hiệu hỗn hợp

ADC, DAC, cảm biến, op-amp, điện áp tham chiếu. Analog quan tâm tới **microvolt**, nên kẻ thù là
**nhiễu, nối đất và sắp đặt** — sự ghép nhiễu từ mạch số và mạch đóng cắt sẽ phá hỏng phép đo.

## Nối đất & sắp đặt

- Dùng **mặt đất liền**; **đừng** cắt nó thành các đảo cô lập (khuyến nghị hiện đại — chia cắt gây
  nhiều rắc rối hơn là giải quyết). Thay vào đó, **phân vùng bằng sắp đặt**: giữ linh kiện analog ở
  vùng analog, số ở vùng số, trên cùng một mặt phẳng liền.
- Giữ **bộ ổn áp đóng cắt và mạch số nhanh** tránh xa mặt analog và điện áp tham chiếu.
- Định tuyến tín hiệu số và analog sao cho chúng không chạy song song/chồng lên nhau.

## Tham chiếu & lọc

- Cho chân tham chiếu và chân nguồn của ADC/DAC **bộ lọc riêng** (ferrite/RC + tụ cục bộ).
- Dùng **điện áp tham chiếu** sạch, ổn định; giữ đường của nó ngắn và yên tĩnh.

## Đo lường (sensing)

- Dùng **đo kiểu Kelvin (4 dây)** cho shunt và phép đo chính xác.
- Bảo vệ (guard) các nút trở kháng cao; giữ đường rò sạch (không cặn flux).

## Layout ADC

- Đặt ADC gần nguồn tín hiệu của nó; đường vào analog ngắn.
- Một đường hồi tiếp sạch và duy nhất cho phần analog; nối về đất hệ thống tại một điểm được chọn
  kỹ gần bộ chuyển đổi.

:::caution Nhiễu len lỏi vào
Lỗi analog phổ biến nhất là **đặt bộ ổn áp đóng cắt hoặc bus số ngay cạnh mặt tín hiệu**. Khắc phục
bằng sắp đặt trước, lọc sau.
:::

## Xem thêm

- [Mạch nguồn](/docs/pcb-design/circuit-blocks/power-supply) — đường nguồn sạch cho analog
- [Tín hiệu số tốc độ cao](/docs/pcb-design/circuit-blocks/high-speed)
- [Thiết bị phòng lab: Đo lường](/docs/equipment/tools/measurement-instruments)
