---
sidebar_position: 1
slug: /microcontroller
title: Vi điều khiển
---

# Vi điều khiển

Một khóa thực hành về lập trình vi điều khiển ARM với **STM32CubeIDE** và mô phỏng mạch trong
**Proteus**, sử dụng **STM32F103C6** làm thiết bị đích. Qua một loạt bài lab, sinh viên xây dựng
các hiệu ứng LED, màn hình hiển thị điều khiển bằng timer, giao diện nút nhấn có chống dội và một
cooperative scheduler.

## Công cụ

- **STM32CubeIDE** — cấu hình ngoại vi, sinh mã, biên dịch & debug (HAL, C).
- **Proteus** — vẽ sơ đồ nguyên lý và mô phỏng; nạp file `.hex` đã sinh vào STM32.
- MCU đích: **STM32F103C6** (ARM Cortex-M3).

## Quy trình làm việc

1. Tạo một dự án STM32Cube, cấu hình chân/clock/ngoại vi, sinh mã.
2. Viết mã ứng dụng bên trong các khối `USER CODE` để mã không bị mất khi sinh lại.
3. Biên dịch và xuất file **Intel `.hex`** (C/C++ Build → Settings → MCU Post build outputs).
4. Trong Proteus, đặt **Program File** của MCU thành file `.hex` và chạy mô phỏng.

## Các bài lab

| Lab | Chủ đề |
| --- | --- |
| [Lab 1](/courses/microcontroller/lab-1-led-animations) | Hiệu ứng LED |
| [Lab 2](/courses/microcontroller/lab-2-timer-led-scanning) | Ngắt Timer & Quét LED |
| [Lab 3](/courses/microcontroller/lab-3-buttons-switches) | Nút nhấn / Công tắc |
| [Lab 4](/courses/microcontroller/lab-4-cooperative-scheduler) | Cooperative Scheduler |

## Nộp bài

Trình diễn bài làm của bạn trong buổi lab và nộp mã nguồn (cùng báo cáo) trên **BKeL**.
