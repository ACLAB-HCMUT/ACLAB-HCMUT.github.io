---
sidebar_position: 1
title: Kết nối & Bus giao tiếp
---

# Kết nối & Bus giao tiếp

Cách một vi điều khiển nói chuyện với cảm biến, ngoại vi và các bo khác. Chọn đúng bus là sự đánh
đổi giữa **số chân, tốc độ, khoảng cách, số thiết bị và khả năng chống nhiễu**.

## So sánh nhanh

| Bus | Dây | Kiểu tín hiệu | Tốc độ điển hình | Khoảng cách | Nhiều thiết bị | Phù hợp cho |
| --- | --- | --- | --- | --- | --- | --- |
| [**UART**](/docs/embedded-firmware/connectivity/uart) | 2 (TX/RX) | Đơn cực, bất đồng bộ | ≤ ~1 Mbps | Ngắn (trên bo) | Không (điểm-điểm) | Debug console, module, bootloader |
| [**I²C**](/docs/embedded-firmware/connectivity/i2c) | 2 (SDA/SCL) | Đơn cực, open-drain | 100 k–3.4 M | Rất ngắn (cm) | Có (theo địa chỉ) | Cảm biến trên bo, EEPROM, RTC |
| **SPI** | 3 + 1/CS | Đơn cực, đồng bộ | hàng chục Mbps | Trên bo | Có (theo CS) | Tốc độ cao trên bo (flash, màn hình, ADC) |
| [**CAN**](/docs/embedded-firmware/connectivity/can) | 2 (CANH/L) | **Vi sai** | 1 M (5 M+ FD) | Hàng chục m | Có (arbitration) | Ô tô, robot, công nghiệp |
| [**RS-485**](/docs/embedded-firmware/connectivity/rs485) | 2 (A/B) | **Vi sai** | ≤ 10 Mbps | Tới ~1200 m | Có (multi-drop) | Liên kết công nghiệp dài (Modbus) |

> SPI đưa vào để tham chiếu; bốn hướng dẫn dưới đây bao quát các bus trong yêu cầu này.

## Cách chọn

- **Trên một bo, ít chân, vài thiết bị chậm** → **I²C**.
- **Trên một bo, cần tốc độ** → **SPI**.
- **Hai thiết bị, đơn giản, debug/module** → **UART**.
- **Cáp dài, môi trường nhiễu, nhiều node** → **RS-485** (hoặc **CAN** cho nhắn tin tin cậy).
- **Tin cậy, phân tán, nhắn tin có ưu tiên** → **CAN**.

:::tip Khoảng cách ⇒ dùng vi sai
Bus đơn cực (UART/I²C/SPI) dành cho dùng **trên bo**. Ngay khi liên kết rời khỏi bo hoặc đi qua
nhiễu, hãy chuyển sang bus **vi sai** (CAN, RS-485) — xem
[Tín hiệu vi sai](/docs/embedded-firmware/connectivity/differential-signaling).
:::

## Xem thêm

- [Xây Dựng Một Sản Phẩm](/docs/embedded-firmware/building-a-product) — các chip transceiver (CAN, RS-485, USB-UART)
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc)
