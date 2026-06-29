---
sidebar_position: 5
title: 'Lab 4: Cooperative Scheduler'
---

# Lab 4: Cooperative Scheduler

## Tổng quan

Một super loop khiến việc chạy các tác vụ tại những thời điểm chính xác trở nên khó khăn. Một
cooperative scheduler — một ISR timer duy nhất được chia sẻ bởi nhiều tác vụ — mang lại một kiến
trúc đơn nhiệm đơn giản và dễ dự đoán. Bài lab này triển khai một scheduler như vậy và chạy nhiều
tác vụ định kỳ qua nó.

## Mục tiêu

- Triển khai một cooperative scheduler để kích hoạt các hoạt động ở những khoảng thời gian chính xác.
- Cập nhật vòng lặp chính để xử lý các ngắt timer (ví dụ một tick 10 ms).

## Kiến trúc

- Một struct tác vụ chứa một con trỏ hàm, delay, period và một bộ đếm `RunMe`.
- **`SCH_Update`** chạy trong ISR timer — nó chỉ đếm ngược các delay và đánh dấu các tác vụ đến hạn.
- **`SCH_Dispatch_Tasks`** chạy trong super loop — nó thực sự thực thi các tác vụ đã được đánh dấu.
  Việc tách update và dispatch giữ cho thời gian đáng tin cậy ngay cả khi một tác vụ chạy lâu.

```c
SCH_Init();
SCH_Add_Task(Led_Display, 0, 1000); // run every 1000 ticks
while (1) { SCH_Dispatch_Tasks(); }
```

## Các hàm bắt buộc

- `void SCH_Update(void)` — được gọi trong ngắt timer; cập nhật thời gian còn lại của mỗi tác vụ.
- `void SCH_Dispatch_Tasks(void)` — chạy tác vụ đến hạn tiếp theo.
- `uint32_t SCH_Add_Task(void (*pFunction)(), uint32_t DELAY, uint32_t PERIOD)` — trả về một task ID.
- `uint8_t SCH_Delete_Task(uint32_t taskID)` — xóa một tác vụ theo ID.

Các phần mở rộng tùy chọn: báo lỗi, chế độ idle/sleep, và một watchdog (khởi động nó trong init,
làm tươi nó trong `SCH_Update`).

## Bài toán

Chạy **5 tác vụ** định kỳ tại 0.5 s, 1 s, 1.5 s, 2 s và 2.5 s. Tránh sự chồng lấp tác vụ bằng cách
chọn các delay khởi tạo hợp lý.

## Trình diễn

Cho thấy một tick 10 ms đều đặn, nhiều timeout đồng thời, và các callback in ra timestamp. Tránh:
chỉ một timeout duy nhất, các callback không đúng thứ tự, công việc O(n) trong `SCH_Update`, hoặc
tần số ngắt cao hơn 10 Hz.

## Nộp bài

Trình diễn trong buổi lab và nộp mã nguồn của bạn trên BKeL.
