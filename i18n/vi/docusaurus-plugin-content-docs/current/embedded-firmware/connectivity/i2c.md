---
sidebar_position: 3
title: I²C
---

# I²C

Bus đồng bộ 2 dây — **SDA** (dữ liệu) và **SCL** (clock) — nơi một master nói chuyện với nhiều thiết
bị có địa chỉ. Cả hai đường đều **open-drain**, nên cần điện trở kéo lên (pull-up).

## Ưu & nhược

| Ưu | Nhược |
| --- | --- |
| Chỉ **2 chân** cho nhiều thiết bị | **Khoảng cách ngắn** (giới hạn bởi điện dung bus) |
| Có **địa chỉ** sẵn (7/10-bit) | Open-drain → cần pull-up, tốc độ vừa phải |
| Chuẩn cho cảm biến | Một thiết bị kẹt có thể **treo cả bus** |
| Đa thiết bị, đa master | Trùng địa chỉ giữa các linh kiện giống nhau |

## Use case

- **Cảm biến trên bo** (IMU, nhiệt độ, áp suất), **EEPROM/RTC**, **port expander**, **OLED** nhỏ,
  cấu hình PMIC.

## Yêu cầu phần cứng

- **Điện trở pull-up** trên SDA và SCL về điện áp bus — ~**4.7 kΩ** (100 kHz) xuống ~**2.2 kΩ**
  (400 kHz+); chỉ **một** cặp pull-up cho mỗi bus.
- Giữ bus **ngắn và điện dung thấp** (đây là bus trên bo).
- Một miền điện áp, hoặc **level translator** giữa thiết bị 1.8/3.3/5 V.
- Giải quyết **trùng địa chỉ**: chân chọn địa chỉ, hoặc **mux/switch** I²C (vd TCA9548A).

## Yêu cầu phần mềm

- Xử lý **START/STOP**, **ACK/NACK**, địa chỉ 7/10-bit.
- Hỗ trợ **clock stretching** (slave giữ SCL ở mức thấp).
- Thêm **timeout** và routine **khôi phục bus** (toggle SCL tới 9 lần để giải phóng slave bị kẹt).

:::caution Lỗi I²C hàng đầu
**Thiếu pull-up** (bus kẹt cao/thấp), **trùng địa chỉ** (hai cảm biến giống nhau), và **bus bị khóa**
do slave đang dở giao dịch. Thêm khôi phục bus và kiểm địa chỉ sớm.
:::

## Xem thêm

- [Tổng quan kết nối](/docs/embedded-firmware/connectivity)
- [Điện trở](/docs/pcb-design/components/resistors) — chọn giá trị pull-up
- [Practice thông dụng](/docs/pcb-design/applied-circuits/common-practices)
