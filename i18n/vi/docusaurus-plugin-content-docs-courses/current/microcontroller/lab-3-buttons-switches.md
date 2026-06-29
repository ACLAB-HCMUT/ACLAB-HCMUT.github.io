---
sidebar_position: 4
title: 'Lab 3: Nút nhấn / Công tắc'
---

# Lab 3: Nút nhấn / Công tắc

## Tổng quan

Các công tắc cơ học bị dội (bounce), nên để đọc chúng một cách đáng tin cậy cần điện trở kéo lên
(pull-up) và chống dội (debounce) bằng phần mềm. Bài lab này đọc một nút nhấn, chống dội nó, và xử
lý nó bằng một máy trạng thái hữu hạn (FSM). Dự án cuối là một đèn giao thông 4 ngả với nhiều chế
độ cấu hình.

## Mục tiêu

- Thêm các file nguồn/header C mới vào một dự án STM32.
- Đọc một ngõ vào số trong một ngắt timer và chống dội nó (ví dụ lọc N = 2).
- Thiết kế và triển khai một FSM trong MCU.

## Ý tưởng chính

- **Điện trở kéo lên:** với một nút nối tới GND, chân đọc 1 khi nhả, 0 khi nhấn.
- **Chống dội:** lấy mẫu mỗi N ms (10 đến 50). So sánh các lần đọc liên tiếp; chỉ chấp nhận một
  trạng thái khi các lần đọc khớp nhau — điều này lọc dội và nhiễu.
- **Tách module:** `input_reading` (driver → buffer) và `input_processing` (FSM → output).

```c
// 3-state FSM
enum ButtonState { BUTTON_RELEASED, BUTTON_PRESSED, BUTTON_PRESSED_MORE_THAN_1_SECOND };
```

## Dự án cuối

Một đèn giao thông ngã tư với 12 LED (4 đỏ / 4 vàng / 4 xanh), bốn màn hình 7 đoạn và ba nút nhấn,
với ít nhất 4 chế độ:

- **Chế độ 1 – Bình thường:** đèn giao thông chạy bình thường.
- **Chế độ 2/3/4 – Chỉnh sửa:** thay đổi thời lượng đèn đỏ / vàng / xanh (phạm vi 1–99). Nút 1
  chọn chế độ, nút 2 tăng giá trị, nút 3 thiết lập giá trị.

## Bài tập

1. Phác thảo FSM. 2. Vẽ sơ đồ Proteus. 3. Tạo dự án STM32 (timer 10 ms).
4. Làm cho chu kỳ timer dễ thay đổi mà không ảnh hưởng đến hành vi. 5. Thêm chống dội nút nhấn
và tăng chế độ. 6. Hiển thị các chế độ trên LED 7 đoạn và nhấp nháy LED theo từng chế độ. 7–9. Tăng
thời lượng đèn đỏ / vàng / xanh bằng nút 2 và nút 3. 10. Tích hợp, quay một bản demo, viết báo cáo.

## Báo cáo & Nộp bài

Nộp bản phác thảo FSM, sơ đồ, mã nguồn, một video demo và một báo cáo trên BKeL.
