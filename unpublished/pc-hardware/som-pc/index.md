---
title: SOM PC
sidebar_position: 1
---

# SOM PC — System-on-Module

**SOM (System-on-Module)** — còn gọi **COM (Computer-on-Module)** — là một máy
tính thu nhỏ trên một module cắm: CPU, RAM, chipset, nguồn lõi và các giao tiếp
tốc độ cao được tích hợp sẵn trên một bo nhỏ, cắm vào **carrier board** do người
dùng thiết kế.

## Vì sao dùng SOM

- **Giấu phần khó** (định tuyến DDR, power lõi CPU, PCIe/USB tốc độ cao) vào
  module đã kiểm định — carrier chỉ lo I/O và cơ khí.
- **Nâng cấp/đổi đời CPU** mà giữ nguyên carrier (nếu cùng chuẩn & pin-out).
- **Rút ngắn thời gian phát triển** cho đề tài edge AI / robotics / IoT.

## Hai chuẩn SOM chính tại ACLAB

| | **COM Express** | **SMARC** |
|---|---|---|
| Tổ chức | PICMG (COM.0) | SGeT |
| Định hướng | Hiệu năng cao, **x86** | Công suất thấp, **ARM** (cả x86) |
| Kết nối | 2× connector board-to-board (tới 440 chân) | **Edge connector** kiểu MXM, 314 chân |
| Nguồn vào | **+12V** | **~5V** (3.0–5.25V) |
| Điểm mạnh | PEG x16, nhiều PCIe, 10GbE (Type 7) | MIPI CSI/DSI, CAN, chiều cao thấp, tiết kiệm điện |
| Hợp với | Node tính toán, GPU/accelerator, server | Thiết bị nhỏ, camera/màn hình MIPI, chạy pin |

### Chọn nhanh

- Cần **CPU x86 mạnh, GPU/accelerator qua PEG, nhiều PCIe, mạng 10GbE** →
  **COM Express**.
- Cần **ARM tiết kiệm điện, camera MIPI-CSI, màn hình MIPI-DSI, CAN, mỏng/nhẹ,
  chạy pin** → **SMARC**.

## Đi sâu

Chi tiết từng chuẩn ở trang con:

- [COM Express](./com-express.md)
- [SMARC](./smarc.md)
