---
sidebar_position: 2
title: Điện trở
---

# Điện trở

Linh kiện phổ biến nhất trên bất kỳ bo nào. Giá trị thường cho biết **nhiệm vụ** — người thiết kế
nhiều kinh nghiệm đọc "10 k" gần như tự động là "pull-up".

## Use case thông dụng (đọc theo giá trị)

| Giá trị | Nhiệm vụ điển hình | Ghi chú |
| --- | --- | --- |
| **10 kΩ** | **Pull-up / pull-down** cho GPIO, reset, boot/strap, enable | Giá trị pull mặc định |
| **4.7 kΩ / 2.2 kΩ** | Pull-up bus **I²C** (SDA/SCL) | Giá trị thấp hơn cho bus nhanh/dài hơn |
| **1 kΩ** | Dòng LED (với 3.3/5 V), pull thông thường, điện trở base | |
| **330 Ω – 1 kΩ** | Điện trở nối tiếp **LED** | Chọn theo dòng LED & nguồn |
| **22 Ω – 33 Ω** | **Series termination** trên USB D+/D−, đường số nhanh | Giảm phản xạ/ringing |
| **0 Ω** | **Jumper / link** — tùy chọn, net tie, sửa layout | Cấu hình linh hoạt giá rẻ |
| **mΩ (shunt)** | **Đo dòng** | Dùng nối kiểu Kelvin (4 dây) |
| **100 kΩ – 1 MΩ** | Pull trở kháng cao, bleeder, chia áp | Lưu ý rò/nhiễu |

## Pull-up & pull-down

- **Pull-up** kéo đường về V+ để có mức xác định khi không ai lái; **pull-down** kéo về GND.
- Cần cho: đầu vào thả nổi, ngõ ra **open-drain** (I²C), đường reset, chân **boot/strap**, chân
  enable, nút nhấn.
- **Đánh đổi giá trị:** R thấp = pull mạnh, sườn nhanh, tốn dòng hơn; R cao = ít tốn điện nhưng
  chậm và dễ nhiễu. 10 k là dung hòa hằng ngày; I²C cần ~2–4.7 k.

## Mạch chia áp

- Hai điện trở đặt một tỉ lệ: `Vout = Vin × R2/(R1+R2)`.
- Dùng cho thang đo ADC, hồi tiếp, chân ID. Giữ trở kháng đủ thấp cho đầu vào ADC.

## Định mức cần kiểm

- **Công suất**: `P = I²R` (hoặc `V²/R`). Một 0603 chịu ~0.1 W — tăng size cho đo dòng/bleed.
- **Dung sai**: 1 % (E96) là chuẩn và rẻ; chỉ dùng chặt hơn ở nơi cần (chia áp, hồi tiếp, sense).

## Xem thêm

- [Practice thông dụng](/docs/pcb-design/applied-circuits/common-practices) — nơi cần pull
- [Mạch MCU & Số](/docs/pcb-design/circuit-blocks/mcu-and-digital)
