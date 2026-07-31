---
title: COM Express
sidebar_position: 2
---

# COM Express

**COM Express** là chuẩn Computer-on-Module do **PICMG** ban hành (đặc tả
**COM.0**), định hướng **hiệu năng cao trên nền x86** (và một số SoC ARM/AMD).
Module ghép vào carrier qua **connector board-to-board**, cho băng thông và số
lane tốc độ cao lớn.

## Đặc tả & phiên bản

| Đặc tả | Nội dung chính |
|---|---|
| COM.0 R2.1 | Chuẩn hoá **Type 6**, USB 3.0, DisplayPort/HDMI qua DDI |
| **COM.0 R3.0** | Thêm **Type 7** (server: tới 4×10GbE, 32 lane PCIe); **bỏ Type 2** (PCI/IDE legacy) |

## Form factor (kích thước)

| Form factor | Kích thước (mm) | Số connector |
|---|---|---|
| Mini | 84 × 55 | 1 (A–B) |
| Compact | 95 × 95 | 2 (A–B, C–D) |
| Basic | 125 × 95 | 2 (A–B, C–D) |
| Extended | 155 × 110 | 2 (A–B, C–D) |

## Pin-out type

Pin-out type quy định **connector nào mang tín hiệu gì** — carrier và module
**phải khớp type**.

| Type | Connector | Đặc trưng |
|---|---|---|
| Type 1 | 1 (A–B, 220 chân) | PCIe ít, không PEG — cho Mini |
| Type 6 | 2 (A–B, C–D, 440 chân) | +PCIe, +PEG x16, +3× DDI, USB 3.0 — **phổ biến nhất** |
| Type 7 | 2 (A–B, C–D, 440 chân) | +tới 4×10GbE, 32 lane PCIe; bỏ ngõ hiển thị — **server/headless** |
| Type 10 | 1 (A–B, 220 chân) | Công suất thấp — cho Mini |

## Connector & tín hiệu

- **Connector board-to-board 0.5 mm pitch**, hàng **A, B** (connector 1) và
  **C, D** (connector 2 — chỉ ở module 2-connector).
- 1 connector = **220 chân**; 2 connector = **440 chân**.

**Type 6 (tham khảo):**

- *Rows A–B:* PCIe lane 0–5, USB 2.0/3.0, SATA, Gigabit Ethernet, LVDS/eDP,
  VGA (analog), HDA (audio), LPC, SPI, I²C, SMBus, nguồn.
- *Rows C–D:* **PEG x16**, **3× DDI** (DisplayPort/HDMI/DVI), thêm PCIe & USB.

## Nguồn

| Rail | Vai trò |
|---|---|
| `VCC_12V` | **Nguồn vào chính** của module |
| `VCC_5V_SBY` | Nguồn standby (wake, quản lý) |
| `VCC_RTC` | Pin nuôi RTC/CMOS (~3V) |

> COM Express R3.0 lấy **+12V làm nguồn vào chính** — carrier **không** cấp
> 5V/3.3V làm nguồn lõi cho module.

## Ưu / nhược

**Ưu:** hiệu năng x86 cao; PEG x16 cho GPU/accelerator; nhiều lane PCIe; 10GbE
(Type 7); hệ sinh thái module x86 rộng.

**Nhược:** công suất & nhiệt lớn (cần tản nhiệt tốt); nguồn 12V + power
sequencing phức tạp hơn; module dày hơn SMARC; giá cao hơn ở phân khúc thấp.

## Khi nào chọn (ACLAB)

- Node tính toán edge cần **CPU x86 mạnh** hoặc **GPU/accelerator qua PEG**.
- Cần **nhiều PCIe/NVMe** hoặc **mạng 10GbE** (Type 7, headless).
- So sánh với SMARC: xem [SOM PC](./index.md).

> **TODO (lab):** điền module thực tế (part number, đời CPU, form factor, type)
> và link schematic/layout carrier khi có.
