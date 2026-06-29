---
sidebar_position: 2
title: 'Lab 1: Hiệu ứng LED'
---

# Lab 1: Hiệu ứng LED

## Tổng quan

Bài lab đầu tiên giới thiệu toàn bộ toolchain: tạo một dự án STM32Cube, mô phỏng trong Proteus, và
điều khiển LED từ STM32F103C6. Bạn bắt đầu từ một LED nhấp nháy đơn lẻ và tiến tới đèn giao thông,
màn hình 7 đoạn và một đồng hồ analog 12 LED.

## Mục tiêu

- Tạo và cấu hình một dự án STM32Cube; sinh mã và xuất file `.hex`.
- Xây dựng và chạy một mô phỏng Proteus với STM32F103C6.
- Điều khiển các ngõ ra GPIO: `HAL_GPIO_TogglePin` / `HAL_GPIO_WritePin`, `HAL_Delay`.

## Phần cứng & Công cụ

- STM32F103C6, LED-RED / LED-YELLOW / LED-GREEN, `7SEG-COM-ANODE`, điện trở.
- PA5 được nối với LED trên board; với 7 đoạn, các đoạn nối tới PB0–PB6
  (active-low: một đoạn sáng khi chân ở mức logic 0).

```c
while (1) {
  HAL_GPIO_TogglePin(LED_RED_GPIO_Port, LED_RED_Pin);
  HAL_Delay(1000); // blink every 1s
}
```

## Bài tập

1. Hai LED (PA5/PA6) đảo trạng thái mỗi 2 s.
2. Đèn giao thông một chiều (đỏ 5 s, vàng 2 s, xanh 3 s).
3. Đèn giao thông 4 ngả với 12 LED.
4. `display7SEG(int num)` — hiển thị các chữ số 0–9 trên một LED 7 đoạn.
5. Tích hợp LED 7 đoạn làm bộ đếm ngược cho đèn giao thông 4 ngả.
6. Một sơ đồ mới với 12 LED bố trí thành đồng hồ analog (PA4–PA15).
7. `clearAllClock()` — tắt tất cả 12 LED đồng hồ.
8. `setNumberOnClock(int num)` — bật LED cho vị trí 0–11.
9. `clearNumberOnClock(int num)` — tắt LED cho vị trí 0–11.
10. Tích hợp mọi thứ: hiển thị giờ/phút/giây với 3 LED sáng.

## Báo cáo & Nộp bài

Với mỗi bài tập, chụp lại sơ đồ Proteus và trình bày mã nguồn của bạn (vòng lặp `while` và bất kỳ
hàm hỗ trợ nào). Nộp trên BKeL.
