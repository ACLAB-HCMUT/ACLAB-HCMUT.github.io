---
sidebar_position: 2
title: Các Phương Pháp Tiếp Cận Firmware
---

# Các Phương Pháp Tiếp Cận Firmware

Cách bạn tổ chức firmware — từ giao tiếp trực tiếp với register, cho đến một RTOS đầy đủ. Mỗi mức độ
đánh đổi **khả năng kiểm soát và dung lượng (footprint)** lấy **tốc độ phát triển và tính năng**. Hãy chọn mức thấp nhất
mà vẫn giúp dự án dễ xây dựng và bảo trì.

| Phương pháp | Kiểm soát / footprint | Tốc độ phát triển | Dùng khi |
| --- | --- | --- | --- |
| Bare-metal (super-loop) | Cao nhất / nhỏ nhất | Chậm | Nhỏ, đơn giản, tiết kiệm năng lượng, tính định thời chặt chẽ |
| HAL / LL của hãng | Cao / nhỏ–trung bình | Trung bình | Hầu hết các dự án MCU đơn chức năng |
| Framework (Arduino, ESP-IDF) | Trung bình / trung bình | Nhanh | Prototype, thiết bị kết nối |
| RTOS (FreeRTOS, Zephyr…) | Trung bình / trung bình–lớn | Trung bình | Đồng thời (concurrency), định thời, kết nối |
| Embedded Linux | Thấp nhất / lớn nhất | Nhanh (mức ứng dụng) | MPU/SoC, tính toán nặng (không phải MCU) |

## Bare-metal (mức register)

Không có hệ điều hành — chỉ một super-loop trong `main()` cùng các ngắt, ghi trực tiếp vào các
register ngoại vi.

- **Ưu điểm:** overhead tối thiểu, kiểm soát hoàn toàn, định thời chặt chẽ, footprint rất nhỏ.
- **Nhược điểm:** phát triển chậm, phải lập lịch thủ công, code dạng blocking dễ sai, khó portable.
- **Dùng cho:** MCU rất nhỏ/rẻ, các node siêu tiết kiệm năng lượng, điều khiển hard real-time.

:::tip CMSIS nằm bên dưới mọi thứ trên ARM
Trên Arm Cortex-M, **CMSIS** cung cấp các định nghĩa register chuẩn và truy cập lõi (core). Ngay cả
"bare-metal" thường cũng có nghĩa là *CMSIS + code của bạn*, chứ không phải các địa chỉ phép thuật thô.
:::

## Thư viện của hãng: HAL và LL

Hầu hết các hãng cung cấp hai lớp (ví dụ STM32 **HAL** và **LL**):

- **HAL (Hardware Abstraction Layer):** mức cao, portable trong cùng một họ chip, viết nhanh.
  - *Nhược điểm:* code lớn hơn, có chút overhead, đôi khi cồng kềnh/có bug — hãy đọc code được sinh ra.
- **LL (Low-Layer):** lớp bọc mỏng gần với register — nhỏ và nhanh, ít hỗ trợ tự động hơn.

Một mô hình phổ biến: làm prototype bằng HAL, rồi chuyển xuống LL hoặc register ở các đường nóng (hot path).

## Framework

- **Arduino** — khởi đầu nhanh nhất, hệ sinh thái thư viện khổng lồ; che giấu chi tiết, kém hiệu quả hơn, kiểm soát hạn chế. Rất phù hợp để học và làm prototype nhanh.
- **ESP-IDF** (Espressif) — framework đầy đủ tính năng cho ESP32, **xây dựng trên FreeRTOS**, kèm theo các stack Wi-Fi/BLE. Lựa chọn nghiêm túc cho các sản phẩm ESP32 có kết nối.

## RTOS (Hệ Điều Hành Thời Gian Thực)

Bổ sung **đa nhiệm preemptive** — các task độc lập, độ ưu tiên, lập lịch, và
đồng bộ hóa (queue, semaphore, mutex). Hãy dùng RTOS khi bạn có các hoạt động đồng thời,
deadline thời gian thực, hoặc cần chạy một stack mạng/USB.

| RTOS | Ghi chú |
| --- | --- |
| **FreeRTOS** | Nhỏ gọn, phổ biến khắp nơi, dễ học, hỗ trợ rất lớn (được AWS hậu thuẫn). Đây là một *kernel* — cần thêm thư viện cho mạng/USB. |
| **Zephyr** | RTOS đầy đủ **+ driver, mạng, device tree**; trung lập với hãng, dễ mở rộng, thuộc Linux Foundation. Học khó hơn, build nặng hơn (CMake/`west`). |
| **ThreadX** (Eclipse ThreadX, trước là Azure RTOS) | Nhỏ, tính định thời chặt chẽ, được chứng nhận an toàn — phổ biến trong công nghiệp/y tế. |
| **embOS** (SEGGER) | Thương mại, rất tin cậy, được chứng nhận an toàn, công cụ tuyệt vời. Có chi phí license. |
| **RT-Thread / NuttX** | Hệ sinh thái thành phần phong phú; NuttX cung cấp API kiểu POSIX. |

:::note Kernel và hệ sinh thái
**FreeRTOS** là một scheduler tinh gọn mà bạn xây dựng *xung quanh* nó. **Zephyr** gần với một hệ điều hành nhỏ hơn —
đã bao gồm driver, subsystem và kết nối — nên nó làm sẵn nhiều việc hơn nhưng đòi hỏi bạn
phải áp dụng toàn bộ hệ thống build của nó. Hãy chọn dựa trên mức độ bạn muốn nền tảng cung cấp sẵn bao nhiêu.
:::

:::tip RTOS không phải lúc nào cũng là câu trả lời
Một super-loop với các ngắt được viết tốt vẫn xử lý ổn nhiều sản phẩm. Hãy thêm RTOS khi
tính đồng thời/định thời thực sự trở nên khó quản lý thủ công — chứ không phải mặc định. Mỗi task tốn RAM
(stack riêng của nó) và làm tăng độ phức tạp.
:::

## Embedded Linux

Dành cho **MPU / SoC** (ví dụ Raspberry Pi, NXP i.MX) — một hệ điều hành đầy đủ với filesystem, mạng và
tiến trình. Đây là một thế giới khác hẳn so với firmware MCU; xem
[Máy Tính Đơn Bo (Single-Board Computers)](/docs/equipment/devices/single-board-computers).

## Chọn phương pháp tiếp cận

- **Bị giới hạn footprint hoặc cần hard real-time?** → bare-metal / LL.
- **Dự án MCU đơn chức năng thông thường?** → HAL (+ LL ở các hot path).
- **Cần Wi-Fi/BLE nhanh?** → ESP-IDF hoặc một framework.
- **Đồng thời, kết nối, hoặc một sản phẩm sẽ phát triển lớn lên?** → FreeRTOS (tinh gọn) hoặc Zephyr (đầy đủ sẵn).
- **Yêu cầu chứng nhận an toàn?** → một RTOS được chứng nhận (ThreadX, embOS).

Xem thêm: [Chọn Vi Điều Khiển](/docs/embedded-firmware/choosing-an-mcu).
