---
sidebar_position: 4
title: Bộ nạp & gỡ lỗi
---

# Bộ nạp & gỡ lỗi

Những thiết bị này đưa mã đã biên dịch của bạn **lên chip** và cho phép bạn **chạy từng bước qua nó** trong khi nó đang chạy.
Trên các MCU ARM (như STM32), việc này diễn ra qua **SWD** (2 dây: SWDIO + SWCLK) hoặc JTAG cũ hơn;
các AVR cũ dùng ISP. Một bộ chuyển đổi nối tiếp (serial adapter) lo phần nạp UART thuần và ghi log kiểu `printf`.

:::info Đấu dây một debugger SWD
Nối **SWDIO, SWCLK, GND**, và thường là một chân tham chiếu điện áp (3.3 V). **GND là bắt buộc** —
nguyên nhân số một của lỗi "target not found" là thiếu hoặc đất kém giữa probe và bo mạch.
:::

## ST-Link

Bộ nạp/gỡ lỗi của ST dành cho STM32 (và STM8). Rẻ, phổ biến, và là lựa chọn mặc định cho
công việc STM32 của phòng lab; hàng nhái có ở khắp nơi và một ST-Link cũng được tích hợp sẵn trong các bo
Nucleo/Discovery.

- **Dùng cho:** nạp và gỡ lỗi STM32 qua SWD.
- **Hoạt động với:** STM32CubeIDE, STM32CubeProgrammer, OpenOCD, PlatformIO.

:::tip
Nếu CubeIDE báo firmware cũ trên ST-Link, hãy chạy **STM32CubeProgrammer → Firmware upgrade**
một lần. Nó khắc phục được rất nhiều lỗi kết nối bí ẩn.
:::

## J-Link

Probe gỡ lỗi cấp chuyên nghiệp của SEGGER. Hỗ trợ nhiều chip, nạp rất nhanh, và bộ công cụ
mạnh mẽ (RTT để ghi log overhead thấp, debugger Ozone).

- **Dùng cho:** công việc đa nhà cung cấp, nạp nhanh/dung lượng lớn, gỡ lỗi nâng cao.
- **Hoạt động với:** hầu như mọi IDE/bộ công cụ lớn, OpenOCD, GDB.

:::caution Cấp phép
J-Link chính hãng là phần cứng được cấp phép. Bộ công cụ đi kèm miễn phí để dùng **với các thiết bị
chính hãng**; mẫu EDU chỉ dành cho mục đích phi thương mại/giáo dục. Hãy dùng các thiết bị chính thức của phòng lab
và đừng trộn lẫn các probe giả vào.
:::

## Bộ chuyển đổi USB-UART (nối tiếp)

Một cầu nối USB-sang-serial (CP2102, CH340, FTDI…) — không phải debugger, nhưng không thể thiếu.

- **Dùng cho:** console nối tiếp / ghi log `printf`, và **nạp** ESP32 cũng như STM32-qua-bootloader.
- **Đấu dây:** chéo **TX↔RX**, dùng chung **GND**. Khớp **mức logic** (3.3 V vs 5 V) với bo mạch của bạn.

:::danger Khớp mức logic
Một bộ chuyển đổi nối tiếp 5 V kích vào chân RX của MCU 3.3 V có thể làm hỏng nó. Nhiều bộ chuyển đổi có một jumper 3.3/5 V —
hãy đặt nó đúng trước khi kết nối, và luôn dùng chung một đất.
:::

## Chọn nhanh

| Tình huống | Công cụ |
| --- | --- |
| Nạp/gỡ lỗi một STM32 | **ST-Link** |
| Đa nhà cung cấp, nạp nhanh, tính năng nâng cao | **J-Link** |
| Log nối tiếp, hoặc nạp ESP32 / bootloader STM32 | **USB-UART** |

:::note
Để biết quy trình firmware xung quanh (bộ công cụ, RTOS, driver) hãy xem
[Firmware nhúng](/docs/embedded-firmware).
:::
