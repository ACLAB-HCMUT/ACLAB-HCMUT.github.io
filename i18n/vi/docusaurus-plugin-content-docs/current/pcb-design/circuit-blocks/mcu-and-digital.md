---
sidebar_position: 2
title: Mạch MCU & Số
---

# Mạch MCU & Số

Lõi số: một vi điều khiển (hoặc SoC), mạch hỗ trợ của nó, và logic/bộ nhớ. Phần lớn công việc là
**làm đúng các mạch hỗ trợ** để chip khởi động tin cậy và chạy sạch.

## Các khối quanh mỗi MCU

- **Chân nguồn + decoupling** — nguồn sạch, được lọc tốt.
- **Clock** — RC nội, hoặc thạch anh/bộ dao động ngoài.
- **Reset** — reset khi cấp nguồn (power-on reset) xác định.
- **Chân boot / strap** — chọn chế độ boot; không được để thả nổi.
- **Nạp / debug** — header SWD, JTAG hoặc UART.
- **GPIO / ngoại vi** — nối tới phần còn lại của bo.

## Decoupling (quy tắc số 1)

- Một tụ gốm **100 nF** cho mỗi chân nguồn, đặt **ngay tại chân**, với via ngắn xuống mặt đất.
- Thêm **tụ bulk** (1–10 µF) cho mỗi đường nguồn, gần chip.
- Đường nguồn ngắn và to, hoặc mặt phẳng nguồn — đừng nối chuỗi (daisy-chain) các tụ decoupling.

## Clock / thạch anh

- Giữ đường thạch anh **ngắn và đối xứng**; đặt tụ tải sát chân.
- Bao quanh bằng **vành đất (ground guard)** và tránh xa tín hiệu nhiễu/tốc độ cao.
- Mặt đất liền dưới vùng thạch anh; không định tuyến đường nào xuyên qua nó.

## Reset & chân strap

- Dùng mạch RC reset khuyến nghị (hoặc IC supervisor) — đừng để chân RESET thả nổi.
- Kéo **chân boot/strap** về mức yêu cầu bằng điện trở. Một chân strap thả nổi = chế độ boot ngẫu nhiên.

## Header nạp / debug

- Luôn đưa **SWD/JTAG** (hoặc bootloader UART) ra một header có ghi nhãn — bạn cần nó để bring-up
  và cập nhật ngoài hiện trường.
- Có nguồn và đất trên header; thêm vài test point cho các tín hiệu quan trọng.

## Danh sách kiểm tra layout

- [ ] 100 nF tại mọi chân nguồn, tụ bulk cho mỗi đường
- [ ] Thạch anh đặt gần, có guard, trên mặt đất liền
- [ ] Reset xác định; mọi chân strap đã được kéo
- [ ] Header debug được đưa ra và ghi nhãn
- [ ] Đã kiểm mức logic 3.3 V vs 5 V trên mọi giao tiếp

:::caution Lỗi thường gặp
Một bo "không chịu boot" thường do **chân boot/strap thả nổi** hoặc **thiếu decoupling** — chứ
không phải chip chết. Kiểm tra những thứ này trước.
:::

## Xem thêm

- [Mạch nguồn](/docs/pcb-design/circuit-blocks/power-supply) — cấp nguồn cho MCU
- [Chọn MCU](/docs/embedded-firmware/choosing-an-mcu)
- [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes)
