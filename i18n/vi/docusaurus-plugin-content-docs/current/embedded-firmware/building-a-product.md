---
sidebar_position: 5
title: Xây Dựng Một Sản Phẩm
---

# Từ Firmware Đến Sản Phẩm

Đưa một thiết bị nhúng/IoT thực sự ra thị trường không chỉ là viết code — bạn phải đặc tả phần cứng mà firmware
cần và lắp ráp đúng các chip hỗ trợ xung quanh MCU. Trang này trình bày **việc định nghĩa
yêu cầu phần cứng** và một **danh mục các khối xây dựng (building block)** xuất hiện trên gần như mọi
bo mạch.

## Định nghĩa yêu cầu phần cứng

Hãy chuyển công việc của sản phẩm thành các thông số cụ thể *trước khi* chọn [MCU](/docs/embedded-firmware/choosing-an-mcu):

| Yêu cầu | Cần ước lượng / đặc tả gì |
| --- | --- |
| **Flash** | Code + tài nguyên + **OTA** (thường dual-bank = ~2×) + ~20–30% khoảng dư |
| **RAM** | Buffer + stack của các task RTOS + stack mạng/TLS + heap + khoảng dư |
| **Hiệu năng** | FPU/DSP nếu phép toán nặng; phân lớp lõi phù hợp với khối lượng công việc |
| **Bảo mật** | Secure boot / lưu khóa → thêm một **secure element** |
| **Kết nối** | Những bus & radio nào → chọn transceiver/module phù hợp |
| **Lưu trữ** | Log/cấu hình/dữ liệu → flash ngoài hoặc EEPROM |
| **Năng lượng** | Nguồn, ngân sách, dòng sleep, tuổi thọ pin |
| **Môi trường** | Grade nhiệt độ, độ kín, bảo vệ ESD/surge |
| **Bring-up** | Header debug (SWD), test point, fiducial |

:::tip TLS và các stack mạng ngốn RAM
Một tính năng kết nối "nhỏ" (Wi-Fi + TLS) có thể cần **hàng chục KB RAM** cho buffer và
chứng chỉ. Hãy lập ngân sách RAM cho *toàn bộ* stack, không chỉ logic ứng dụng của bạn.
:::

## Các khối xây dựng thường gặp

Những thứ bạn thường đặt xung quanh MCU, được nhóm theo chức năng.

### Nguồn

- **LDO** (bộ ổn áp tuyến tính low-dropout) — đơn giản, ít nhiễu, dòng thấp. *Ví dụ AMS1117, MCP1700.*
- **Buck / boost** (switching) — hiệu suất cao, dùng cho dòng lớn hơn hoặc hạ áp nhiều.
- **PMIC / sạc pin / fuel gauge** — *ví dụ sạc TP4056* cho các sản phẩm Li-ion.
- **Bảo vệ** — diode TVS/ESD, bảo vệ ngược cực, cầu chì.

### Tạo xung nhịp (thạch anh & oscillator)

- **Thạch anh chính (HSE)** — xung nhịp hệ thống chính xác, *ví dụ 8–25 MHz*, cần đúng tụ tải (load capacitor).
- **Thạch anh 32.768 kHz** — cho **RTC** / giữ thời gian ở chế độ tiết kiệm năng lượng.
- **TCXO / module oscillator** — khi bạn cần độ chính xác cao (ví dụ radio, định thời chính xác).
- **RC nội** — tiện lợi nhưng không chính xác.

:::caution Một số ngoại vi yêu cầu thạch anh thật
**USB, CAN và các baud rate UART chính xác** nhìn chung cần một thạch anh ngoài — bộ dao động RC
nội thường không đủ chính xác. Hãy quyết định việc tạo xung nhịp từ sớm.
:::

### Bộ nhớ & lưu trữ

- **SPI / QSPI NOR flash** — lưu trữ code/dữ liệu/OTA ngoài. *Ví dụ dòng W25Q.*
- **SDRAM / PSRAM** — RAM ngoài cho các buffer lớn (màn hình hiển thị, MPU, PSRAM của ESP32).
- **EEPROM** — cấu hình non-volatile nhỏ. *Ví dụ 24Cxx (I²C).*
- **eMMC / NAND / thẻ SD** — lưu trữ dung lượng lớn cho log và filesystem.

### Các chip giao tiếp & chuyển đổi tín hiệu

Những chip này làm cầu nối giữa các chân mức logic của MCU với các bus thực tế và các miền điện áp/cách ly khác:

| Chức năng | Linh kiện phổ biến | Nó làm gì |
| --- | --- | --- |
| **Cầu USB ↔ UART** | CH340, CP2102, FT232 | Lập trình/console qua USB |
| **CAN transceiver** | TJA1050, SN65HVD230 | Bộ điều khiển CAN của MCU ↔ bus CAN vi sai |
| **RS-485 transceiver** | MAX485, dòng THVD | Bus công nghiệp vi sai, đa điểm (multidrop) |
| **Bộ dịch mức RS-232** | MAX232 | Mức điện áp serial cổ điển |
| **Digital isolator** | **ADuM1201** (ADI) | Truyền tín hiệu qua các miền đất/an toàn được cách ly |
| **Bộ dịch mức logic** | — | Giao tiếp 3.3 V ↔ 5 V |
| **Ethernet PHY** | LAN8720 (+ biến áp RJ45) | MAC ↔ Ethernet vật lý |

:::note Vì sao cần cách ly (ví dụ ADuM1201)?
Bộ cách ly cắt các vòng đất (ground loop) và **bảo vệ phía MCU khỏi điện áp cao hoặc các miền nhiễu** —
thiết yếu trong các thiết kế công nghiệp, y tế và kết nối điện lưới. Một số linh kiện còn mang theo
nguồn cách ly (ví dụ họ ADuM5xxx).
:::

### Kết nối / radio

- **Wi-Fi / BLE** — module hoặc SoC (ví dụ ESP32).
- **Cellular** — module modem (ví dụ SIMxx, Quectel) cho LTE/NB-IoT.
- **LoRa** — tầm xa, tiết kiệm năng lượng (ví dụ SX127x).
- **GNSS** — module định vị.

### Bảo mật

- **Secure element / IC crypto-auth** — *ví dụ ATECC608, NXP SE050* — lưu khóa được bảo vệ,
  xác thực, và hỗ trợ secure-boot, tách khỏi MCU chính.

### Đồng hồ thời gian thực & linh tinh

- **Chip RTC** (*ví dụ DS3231*) + pin cúc áo — giữ thời gian khi mất điện.
- **Cảm biến** — IMU, nhiệt độ/độ ẩm, v.v.
- **Bộ mở rộng GPIO/port** (I²C) khi bạn hết chân.

## Một node IoT tối thiểu — hình dạng BOM điển hình

- MCU/SoC có Wi-Fi/BLE (ví dụ ESP32) · **LDO** cho đường nguồn · **thạch anh** + tụ tải ·
  **USB-UART (CH340)** để lập trình · **QSPI flash** ngoài · (các) cảm biến ·
  bảo vệ **TVS/ESD** · các điểm debug/test.

:::tip Module so với linh kiện rời
Giai đoạn đầu, **module** (Wi-Fi, cellular… đã được chứng nhận sẵn) tiết kiệm công sức thiết kế và chứng nhận.
Chỉ chuyển sang các chip rời khi sản lượng đủ lớn để bù cho công kỹ thuật tăng thêm. Xem
[tối ưu chi phí PCB](/docs/pcb-design/fabrication-and-ordering#cost-optimization).
:::

Xem thêm: [Chọn Vi Điều Khiển](/docs/embedded-firmware/choosing-an-mcu) ·
[Chủ Đề Nâng Cao](/docs/embedded-firmware/advanced-topics) ·
[Thiết Kế PCB](/docs/pcb-design).
