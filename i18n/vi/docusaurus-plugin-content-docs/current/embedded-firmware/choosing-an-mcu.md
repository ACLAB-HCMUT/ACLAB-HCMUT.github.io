---
sidebar_position: 3
title: Chọn Vi Điều Khiển
---

# Chọn Vi Điều Khiển

Chọn một vi điều khiển là sự đánh đổi giữa hiệu năng, ngoại vi, năng lượng, chi phí,
độ bền và hệ sinh thái — **chứ không phải một con số duy nhất**. Trang này trình bày các họ chip phổ biến, cách
lựa chọn, và những cái bẫy cần tránh.

## Các họ phổ biến

| Họ | Lõi / ISA | Điểm mạnh |
| --- | --- | --- |
| **AVR** (ATmega/ATtiny), **PIC**, **8051** | 8-bit | Rẻ, đơn giản, bền, hiệu năng thấp — Arduino Uno dùng AVR |
| **STM32** (ST) | Arm Cortex-M0/M3/M4/M7/M33 | Lựa chọn mặc định của lab — dải sản phẩm rộng, ngoại vi phong phú, công cụ tuyệt vời |
| **ESP32** (Espressif) | Xtensa / RISC-V | Tích hợp sẵn Wi-Fi + BLE — IoT |
| **Nordic nRF52/nRF53** | Cortex-M | Bluetooth Low Energy / tiết kiệm năng lượng |
| **RP2040 / RP2350** (Raspberry Pi) | Cortex-M0+ / M33 + RISC-V | Rẻ, dual-core, dành cho hobby & giáo dục |
| **TI MSP430** | 16-bit | Cảm biến siêu tiết kiệm năng lượng |
| **NXP, Renesas, Microchip SAM** | Cortex-M | Bao phủ rộng cho công nghiệp / ô tô |
| **GD32, WCH CH32V, SiFive** | RISC-V | Chi phí thấp, ISA mở, hệ sinh thái đang phát triển |

## Tiêu chí lựa chọn

- **Hiệu năng** — xem [các lưu ý bên dưới](#dont-pick-on-clock-speed-alone); hãy đánh giá lõi + tính năng, không chỉ MHz.
- **Ngoại vi** — đúng số lượng và loại: độ phân giải/số kênh ADC, timer/PWM, UART/I²C/SPI/CAN/USB/Ethernet.
- **Bộ nhớ** — đủ flash + RAM, kèm khoảng dư (một RTOS và các stack ngốn RAM).
- **Năng lượng** — dòng tiêu thụ khi hoạt động và khi sleep, các chế độ tiết kiệm năng lượng — quan trọng với thiết bị dùng pin.
- **Kết nối** — Wi-Fi/BLE/Thread/cellular được tích hợp sẵn, hay phải dùng ngoài?
- **Chi phí** — giá mỗi đơn vị *ở sản lượng của bạn*, cộng chi phí dev-board và công cụ.
- **Tính sẵn có & vòng đời** — tồn kho hiện tại, tuổi thọ/EOL, và một **nguồn cung thứ hai (second source)**. Các cú sốc nguồn cung (2021–2022) đã khiến nhiều thiết kế dựa trên linh kiện nguồn cung duy nhất bị mắc kẹt.
- **Nhiệt độ hoạt động** — chọn grade phù hợp với môi trường (xem bên dưới).
- **Độ bền & an toàn** — phát hiện sụt áp (brown-out), watchdog, định mức ESD, bộ nhớ ECC; các chứng nhận an toàn (IEC 61508, ISO 26262) cho hệ thống quan trọng.
- **Hệ sinh thái & tính tương thích** — toolchain, hỗ trợ HAL/RTOS, debugger, cộng đồng, và **các thành viên cùng họ tương thích chân (pin-compatible)** để bạn có thể nâng cấp/hạ cấp mà không cần thiết kế lại.
- **Bảo mật** — TrustZone (Cortex-M33), secure boot, crypto phần cứng.

### Các grade nhiệt độ hoạt động

| Grade | Dải nhiệt độ điển hình | Sử dụng |
| --- | --- | --- |
| Commercial | 0 … +70 °C | Tiêu dùng trong nhà |
| Industrial | −40 … +85 °C | Hầu hết môi trường thực tế / ngoài trời |
| Automotive (AEC-Q100) | −40 … +125 °C | Xe cộ, môi trường khắc nghiệt |

:::caution Chọn grade phù hợp với môi trường
Một linh kiện grade commercial dùng trong thiết bị ngoài trời hay khoang động cơ sẽ trôi thông số hoặc hỏng. Với bất cứ thứ gì
vượt khỏi môi trường trong nhà ôn hòa, hãy mặc định chọn **industrial (−40…+85 °C)**.
:::

## Những cái bẫy — đọc trước khi quyết định

### Đừng chọn chỉ dựa trên tốc độ xung nhịp

MHz chỉ là một phần của hiệu năng. Hai chip cùng xung nhịp có thể chênh nhau vài lần:

- **Kiến trúc / IPC** — một Cortex-**M7** làm được nhiều việc hơn hẳn mỗi chu kỳ so với **M0+**; chỉ số DMIPS/MHz thay đổi theo lõi.
- **FPU** — nếu không có đơn vị xử lý dấu phẩy động bằng phần cứng, mọi phép `float` đều được mô phỏng bằng phần mềm (thường chậm hơn 10×+). Một **M4 @ 80 MHz có FPU** có thể vượt một **M0 @ 100 MHz** trong các phép toán.
- **Lệnh DSP** — SIMD/MAC của Cortex-M4/M7 tăng tốc lọc tín hiệu và các vòng điều khiển.
- **Flash wait state / cache** — ở xung nhịp cao, flash không theo kịp; một accelerator/cache (hoặc chạy từ RAM) mới là thứ mang lại tốc độ định mức.

:::tip FPU: biết rõ bạn cần gì
Hầu hết Cortex-M4/M7 có FPU **single-precision**. Nếu code của bạn cần độ chính xác **double** và
FPU chỉ hỗ trợ single, các phép double đó vẫn chạy bằng phần mềm. Hãy chọn FPU phù hợp với phép toán của bạn.
:::

### RISC-V và Arm

| | **Arm Cortex-M** | **RISC-V** |
| --- | --- | --- |
| Hệ sinh thái | Trưởng thành — công cụ, RTOS, thư viện, hỗ trợ | Trẻ hơn, đang phát triển nhanh |
| ISA | Có license (các hãng trả phí cho Arm) | **Mở**, miễn phí bản quyền, có thể tùy biến |
| Rủi ro | Rất thấp, đã được kiểm chứng | Công cụ/sự phân mảnh vẫn đang ổn định dần |
| Xu hướng chi phí | — | Thường rẻ hơn về silicon |

- **Chọn Arm** để có công cụ đã được kiểm chứng, hỗ trợ RTOS/thư viện rộng, và rủi ro dự án thấp nhất (lựa chọn an toàn mặc định hiện nay).
- **Chọn RISC-V** vì chi phí, tính mở, hoặc silicon tùy biến — và chấp nhận một hệ sinh thái kém trưởng thành hơn.

:::note Những thứ người ta hay quên
- **Kiểm tra errata sheet** — bug silicon là có thật và có thể làm hỏng một ngoại vi mà bạn dựa vào.
- **Tính sẵn có của dev board + debugger** — bạn muốn làm prototype ngay từ ngày đầu (ví dụ ST-Link/J-Link; xem [Programmer & Debugger](/docs/equipment/tools/programmers-debuggers)).
- **Tương thích footprint/chân** trong cùng một họ cho phép bạn thay đổi bộ nhớ/tốc độ muộn mà không cần làm lại bo mạch.
:::

## Một luồng quyết định nhanh

1. **Kết nối?** Cần Wi-Fi/BLE → ESP32 / nRF. Nếu không thì một MCU thường.
2. **Hiệu năng & phép toán?** Float/DSP nặng → Cortex-M4/M7 có FPU. I/O đơn giản → M0+/8-bit.
3. **Môi trường?** Ngoài trời/khắc nghiệt → grade industrial/automotive.
4. **Năng lượng?** Dùng pin → họ tiết kiệm năng lượng (MSP430, nRF, STM32L).
5. **Chi phí & nguồn cung?** Kiểm tra giá mỗi đơn vị *và* tồn kho thực tế + một second source.
6. **Hệ sinh thái?** Ưu tiên họ chip mà nhóm và công cụ của bạn đã hỗ trợ sẵn.

Xem thêm: [Các Phương Pháp Tiếp Cận Firmware](/docs/embedded-firmware/firmware-approaches) và
[hướng dẫn phần cứng Vi điều khiển của lab](/docs/equipment/devices/microcontrollers).
