---
slug: /embedded-firmware
title: Firmware Nhúng
---

# Firmware Nhúng

Các hướng dẫn về vi điều khiển, RTOS, driver ngoại vi và kỹ thuật phát triển firmware.

## Hướng dẫn

- [**Các Phương Pháp Tiếp Cận Firmware**](/docs/embedded-firmware/firmware-approaches) — bare-metal, HAL/LL, framework và RTOS (FreeRTOS, Zephyr, embOS).
- [**Chọn Vi Điều Khiển**](/docs/embedded-firmware/choosing-an-mcu) — các họ chip, tiêu chí lựa chọn, và những cái bẫy về tốc độ xung nhịp / FPU / RISC-V-so-với-Arm.
- [**Chủ Đề Nâng Cao**](/docs/embedded-firmware/advanced-topics) — mô hình bộ nhớ, quản lý bộ nhớ, các lỗi bộ nhớ, làm việc ở mức register, và các phương pháp debug.
- [**Xây Dựng Một Sản Phẩm**](/docs/embedded-firmware/building-a-product) — yêu cầu phần cứng và các chip thường gặp (LDO, CH340, CAN/RS-485, isolator, thạch anh, SDRAM…).

## Chủ đề

- **Vi điều khiển:** STM32, ESP32, AVR — kiến trúc và toolchain
- **Ngoại vi:** GPIO, timer, PWM, ADC, ngắt (interrupt)
- **Giao tiếp:** UART, I2C, SPI, CAN
- **RTOS:** task, scheduling, đồng bộ hóa trong FreeRTOS
- **Debug:** SWD/JTAG, máy phân tích logic (logic analyzer), đo công suất (power profiling)

## Toolchain khuyến nghị

- STM32CubeIDE / PlatformIO / Arduino
- Bộ nạp (programmer): ST-Link, J-Link, USB-UART

> Hãy bổ sung hướng dẫn theo cấu trúc: Mục tiêu → Điều kiện tiên quyết → Các bước → Kết quả → Tài liệu tham khảo.
