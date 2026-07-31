---
title: SMARC
sidebar_position: 3
---

# SMARC

**SMARC** (*Smart Mobility ARChitecture*) là chuẩn Computer-on-Module do
**SGeT** (Standardization Group for Embedded Technologies) ban hành, định hướng
**công suất thấp trên nền ARM** (và cả SoC x86 tiết kiệm điện). Module dùng
**edge connector** kiểu MXM — mỏng, nhẹ, giá thấp.

## Đặc tả & phiên bản

| Đặc tả | Nội dung chính |
|---|---|
| SMARC 1.x | Bản đầu, tập trung ARM di động |
| **SMARC 2.x** (2.1.1) | Chuẩn hiện hành: bổ sung PCIe/USB 3.0, nhiều MIPI CSI/DSI, chuẩn hoá pin-out |

## Form factor (kích thước)

| Loại | Kích thước (mm) |
|---|---|
| Full-size | 82 × 80 |
| Short / half-size | 82 × 50 |

- **Edge connector kiểu MXM 314 chân, pitch 0.5 mm** (card-edge cắm nghiêng).
- Module nằm **song song, sát carrier** ⇒ **chiều cao thấp** — hợp thiết bị mỏng.

## Giao tiếp nổi bật

- **MIPI CSI** (camera) và **MIPI DSI** (màn hình) — thế mạnh cho ứng dụng thị
  giác / HMI nhúng.
- Hiển thị: **LVDS/eDP**, **HDMI/DP**.
- **PCIe**, **USB** (gồm USB 3.0), **Gigabit Ethernet**.
- **CAN**, **I²C**, **SPI**, **UART**, **SDIO**, **I²S** (audio), nhiều **GPIO**.

> So với COM Express: SMARC mạnh về **MIPI CSI/DSI + CAN** (mobile/IoT/robot),
> nhưng **không** có PEG x16 hay 10GbE.

## Nguồn

- **Một nguồn vào duy nhất ~5V** (dải **3.0–5.25V**) — điện áp thấp, rất hợp
  **chạy pin**.
- Có chân quản lý nguồn/khởi động, `VDD_RTC` nuôi RTC.

> Khác biệt lớn với COM Express (12V): SMARC đơn giản hoá nguồn carrier, tiêu
> thụ thấp.

## Ưu / nhược

**Ưu:** tiêu thụ điện thấp (hợp pin); chiều cao thấp, gọn nhẹ; sẵn MIPI
CSI/DSI & CAN; nguồn 5V đơn giản; hệ sinh thái SoC ARM (NXP i.MX, Rockchip,
TI…) phong phú.

**Nhược:** hiệu năng/băng thông thấp hơn COM Express; **không PEG x16**, ít lane
PCIe; edge connector chịu rung/số lần cắm-rút kém hơn board-to-board; ít lựa
chọn x86 hiệu năng cao.

## Khi nào chọn (ACLAB)

- Thiết bị **chạy pin / tiết kiệm điện**, cần **camera MIPI-CSI** hoặc **màn
  hình MIPI-DSI**.
- Ứng dụng **robot/xe/IoT** cần **CAN** và nhiều GPIO, ưu tiên **mỏng nhẹ**.
- Cần x86 mạnh, GPU rời, hay 10GbE → cân nhắc [COM Express](./com-express.md).

> **TODO (lab):** điền module SMARC thực tế (SoC, nhà sản xuất, full/half-size)
> và link carrier/nguồn khi có.
