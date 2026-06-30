---
sidebar_position: 6
title: Tín hiệu vi sai & EMI/EMC
---

# Tín hiệu vi sai & EMI/EMC

Hầu hết các liên kết bền/nhanh (CAN, RS-485, USB, Ethernet, LVDS, HDMI, MIPI) đều **vi sai**. Trang
này giải thích vì sao, và cách nó gắn với **EMI/EMC** — cái gì sinh ra nhiễu điện từ và vì sao tín
hiệu vi sai chống lại được.

## Đơn cực vs vi sai

- **Đơn cực (single-ended)** (UART, I²C, SPI, GPIO thường): một dây mang tín hiệu, đo so với **đất**
  chung. Đơn giản, nhưng mọi nhiễu hay dịch đất đều đi thẳng vào kết quả đọc.
- **Vi sai (differential)**: hai dây mang tín hiệu **bằng nhau và ngược dấu**; bộ thu đọc **hiệu**
  giữa chúng. Nhiễu tác động đều lên cả hai dây (**common-mode**) sẽ triệt tiêu.

## Ưu & nhược

| Ưu | Nhược |
| --- | --- |
| **Loại nhiễu common-mode** → miễn nhiễm cao | Hai dây/chân thay vì một |
| **Phát xạ thấp hơn** (trường của cặp triệt tiêu nhau) | Cần định tuyến **khớp** (chiều dài + trở kháng) |
| Chịu được **chênh lệch điện thế đất** | Cần transceiver |
| Nhanh hơn / xa hơn | Cần chăm layout PCB hơn (cặp, mặt phẳng) |

## Cách nó giúp EMC (cả hai chiều)

- **Phát xạ:** dòng bằng-và-ngược tạo trường **triệt tiêu** nhau, nên cặp chặt phát xạ ít hơn nhiều
  so với một đường đơn cực + vòng hồi tiếp của nó.
- **Miễn nhiễm:** nhiễu bên ngoài ghép lên **cả hai** đường gần như bằng nhau; bộ thu trừ nó đi
  (**common-mode rejection**).

Bạn chỉ được lợi ích này nếu cặp được **ghép chặt và cân bằng** — định tuyến theo cặp, **khớp chiều
dài**, **trở kháng kiểm soát** (90/100 Ω), trên một **mặt phẳng tham chiếu liền**. Một
**common-mode choke** loại bỏ nhiễu common-mode còn sót trên cáp.

## Nguồn EMI (cái gì sinh ra nhiễu)

- **Bộ ổn áp đóng cắt** — nút đóng cắt nhanh và vòng dòng của nó.
- **Sườn số nhanh & clock** — sườn sắc mang nhiều năng lượng tần số cao.
- **Vòng dòng lớn** — như ăng-ten vòng (vấn đề [đường hồi tiếp](/docs/pcb-design/fundamentals/return-paths-and-grounding)).
- **Tải cảm** — động cơ, relay, solenoid (xung đóng cắt).
- **ESD** và surge bên ngoài.
- **Cáp** — đường/cáp dài hành xử như ăng-ten; ground bounce kích chúng.

## Tác hại của EMI (vì sao bạn cần quan tâm)

- Sai bit / lỗi CRC, **reset** không rõ nguyên nhân, **ADC** đọc nhiễu, và **trượt chứng nhận EMC**
  (sản phẩm không thể bán cho tới khi đạt).

## Tóm tắt giảm thiểu

- Ưu tiên **vi sai** cho bất cứ thứ gì ra khỏi bo hoặc nhiễu (CAN, RS-485, USB, Ethernet).
- Thu nhỏ vòng dòng; giữ **mặt phẳng tham chiếu liền**; không cắt qua khe mặt phẳng.
- Làm chậm sườn không cần thiết; giữ vòng bộ ổn áp đóng cắt chặt.
- **Lọc và bảo vệ** cáp/đầu nối: common-mode choke, ferrite, TVS/ESD.

:::tip Đây là cầu nối firmware ↔ PCB
Chọn một bus vi sai là quyết định *firmware/hệ thống*; **hiện thực hóa lợi ích EMC** của nó là việc
*layout PCB*. Xem [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc) và
[Tín hiệu số tốc độ cao](/docs/pcb-design/circuit-blocks/high-speed).
:::

## Xem thêm

- [CAN](/docs/embedded-firmware/connectivity/can) · [RS-485](/docs/embedded-firmware/connectivity/rs485)
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc) · [Đường hồi tiếp & Nối đất](/docs/pcb-design/fundamentals/return-paths-and-grounding)
