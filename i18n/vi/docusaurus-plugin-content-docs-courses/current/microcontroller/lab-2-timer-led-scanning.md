---
sidebar_position: 3
title: 'Lab 2: Ngắt Timer & Quét LED'
---

# Lab 2: Ngắt Timer & Quét LED

## Tổng quan

Timer cho phép chúng ta chạy mã ở những khoảng thời gian chính xác mà không bị chặn (blocking).
Bài lab này cấu hình một ngắt Timer 2 mỗi 10 ms và dùng nó để quét nhiều màn hình 7 đoạn, xây
dựng một đồng hồ số, và tạo một **software timer** không chặn. Một ma trận LED 8×8 tùy chọn sẽ mở
rộng ý tưởng này.

## Mục tiêu

- Cấu hình một ngắt Timer 2 kích hoạt mỗi 10 ms.
- Quét (multiplex) nhiều màn hình 7 đoạn sao cho chúng trông như sáng đồng thời.
- Thay thế `HAL_Delay` gây chặn bằng một software timer điều khiển bởi ngắt.

## Thiết lập timer

Với clock 8 MHz, đặt **Prescaler = 7999** và **Counter Period = 9**:
8 MHz / (7999+1) = 1000 Hz, chia cho 10 → 100 Hz → một ngắt **10 ms**. Bật ngắt toàn cục TIM2
(NVIC), khởi động nó bằng `HAL_TIM_Base_Start_IT(&htim2)`, và đặt mã định kỳ của bạn vào callback.

```c
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
  if (htim->Instance == TIM2) {
    // runs every 10 ms
  }
}
```

Các LED được quét nhanh hơn ~30 Hz sẽ trông như sáng liên tục; trên Proteus dùng tần số thấp
(ví dụ 1 Hz) vì trình mô phỏng không thể chạy ở tốc độ tối đa.

## Bài tập

1. Hiển thị "1" và "2" trên hai LED 7 đoạn, chuyển đổi mỗi 0.5 s.
2. Mở rộng lên bốn LED 7 đoạn + hai LED DOT (PA4); nhấp nháy DOT mỗi giây.
3. Triển khai `update7SEG(int index)` điều khiển bằng một buffer 4 phần tử.
4. Đặt tần số quét 4 chữ số là 1 Hz; vẫn giữ DOT nhấp nháy.
5. Một đồng hồ số (giờ/phút) qua `updateClockBuffer()`.
6. Tạo một **software timer** (`setTimer0`, `timer_run`, `timer0_flag`) để loại bỏ `HAL_Delay`.
7. Viết lại đồng hồ ở Bài 5 dùng software timer; chuyển DOT sang `main`.
8. Chuyển `update7SEG()` sang `main`; ngắt chỉ phục vụ các software timer.
9. (Mở rộng) Thêm một ma trận LED 8×8 (MATRIX-8X8-RED + ULN2803); hiển thị ký tự "A".
10. Tạo hiệu ứng cho ma trận (ví dụ cuộn ký tự sang trái).

## Báo cáo & Nộp bài

Trình bày sơ đồ Proteus và mã nguồn liên quan (callback / `main`). Với software timer, giải thích
điều gì xảy ra với `setTimer0(1)`, `setTimer0(10)` và khi thiếu lời gọi khởi tạo ban đầu.
