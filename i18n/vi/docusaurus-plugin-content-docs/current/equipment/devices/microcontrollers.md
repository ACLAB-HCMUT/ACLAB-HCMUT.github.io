---
sidebar_position: 2
title: Vi điều khiển (MCU)
---

# Vi điều khiển (MCU)

Vi điều khiển là một chip đơn tích hợp sẵn CPU, bộ nhớ và các ngoại vi (GPIO, timer, ADC,
UART/I²C/SPI…). Nó chạy một chương trình trực tiếp trên phần cứng — không cần hệ điều hành —
điều này giúp nó **có tính tất định và phản ứng nhanh**, lý tưởng cho cảm biến, động cơ,
và định thời chính xác.

:::info Cấp nguồn & mức logic
Hầu hết MCU trong phòng lab chạy ở **mức logic 3.3 V**. Đưa 5 V vào một chân 3.3 V có thể làm hỏng chip.
Luôn xác nhận điện áp hoạt động trước khi đấu dây, và dùng bộ dịch mức (level shifter) khi phối hợp các linh kiện 3.3 V
và 5 V.
:::

## STM32 (ARM Cortex-M)

Dòng MCU 32-bit hiệu năng cao của ST. Chuẩn của phòng lab cho môn Vi điều khiển là
**STM32F103** (lớp "Blue Pill", Cortex-M3 @ 72 MHz).

- **Dùng cho:** điều khiển thời gian thực, ngoại vi phong phú, các dự án vượt quá khả năng của Arduino.
- **Bộ công cụ:** STM32CubeIDE (HAL/LL) hoặc PlatformIO. Mô phỏng bằng Proteus.
- **Nạp chương trình:** SWD qua [ST-Link](/docs/equipment/tools/programmers-debuggers); nạp qua bootloader bằng UART cũng được.

:::tip
Hãy dùng STM32CubeMX (tích hợp sẵn trong CubeIDE) để cấu hình xung nhịp và chân một cách trực quan trước khi viết một
dòng mã — nó ngăn ngừa lỗi "ngoại vi không khởi động" thường gặp nhất.
:::

## ESP32 (Wi-Fi + Bluetooth)

Một MCU lõi kép với **Wi-Fi và Bluetooth tích hợp sẵn** — lựa chọn hàng đầu cho IoT. Môn IoT của phòng lab
sử dụng **ESP32 với cảm biến DHT20**.

- **Dùng cho:** thiết bị kết nối, telemetry lên đám mây, BLE.
- **Bộ công cụ:** PlatformIO (framework Arduino hoặc ESP-IDF).
- **Nạp chương trình:** USB-UART tích hợp sẵn trên hầu hết các bo phát triển — chỉ cần cắm USB, không cần bộ nạp ngoài.

:::caution Sụt áp (Brown-out)
Các đợt phát Wi-Fi tạo ra đỉnh dòng. Một cổng USB yếu hoặc cáp mỏng sẽ gây khởi động lại
ngẫu nhiên ("brownout detector triggered"). Hãy dùng cáp chất lượng và nguồn 500 mA+.
:::

## Arduino / AVR

Các MCU 8-bit kinh điển (ví dụ ATmega328P trên Arduino Uno). Logic 5 V, rất thân thiện với người mới.

- **Dùng cho:** nguyên mẫu nhanh, giảng dạy, I/O đơn giản.
- **Bộ công cụ:** Arduino IDE hoặc PlatformIO.
- **Giới hạn:** tốc độ/RAM khiêm tốn và không có kết nối mạng — hãy nâng cấp lên STM32/ESP32 khi bạn chạm trần.

## Chọn nhanh

| Nhu cầu | Hãy chọn |
| --- | --- |
| Wi-Fi / Bluetooth | **ESP32** |
| Nhiều ngoại vi, điều khiển thời gian thực | **STM32** |
| Khởi đầu đơn giản nhất có thể | **Arduino / AVR** |

:::warning Trước khi rời bàn làm việc
Tắt nguồn trước khi đấu lại dây, kiểm tra kỹ VCC/GND, và đừng bao giờ cắm nóng (hot-plug) một bo mạch khi nguồn
đang bật. Xem [Nội quy & An toàn phòng lab](/docs/lab-rules).
:::
