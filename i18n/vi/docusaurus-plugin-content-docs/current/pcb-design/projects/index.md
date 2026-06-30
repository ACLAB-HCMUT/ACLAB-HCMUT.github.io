---
sidebar_position: 1
title: PCB Examples & Reference
---

# PCB Examples & Reference

Các ví dụ thiết kế PCB thực tế và tài liệu tham khảo — những bo mạch thật được phân tích thành
hướng dẫn thực hành, từng bước mà bạn có thể làm theo trong [KiCad](/docs/pcb-design/eda-tools). Hãy
dùng chúng cùng với [Common Mistakes & Risks](/docs/pcb-design/common-mistakes) và
[From Design to Delivery](/docs/pcb-design/fabrication-and-ordering).

## Intel x86 Carrier Board

Một bo mạch carrier/mở rộng dùng để gắn một **coreboard Intel x86**, tích hợp các giao tiếp PC phổ
biến (PCIe, M.2 Wi-Fi, HDMI/DP, USB, SATA, audio, LAN, nguồn kiểu ATX). Cấu hình nền tảng: **KiCad → JLCPCB,
6 lớp, kiểm soát trở kháng (controlled-impedance)**.

- [**Overview**](/docs/pcb-design/projects/intel-x86-carrier-overview) — kiến trúc, thứ tự ưu tiên, các quyết định quan trọng, những điều cần kiểm chứng.
- [**Power & Power Management**](/docs/pcb-design/projects/intel-x86-carrier-power) — đầu vào 12V, power mux, các rail standby, các tín hiệu trạng thái nguồn.
- [**High-Speed Interfaces**](/docs/pcb-design/projects/intel-x86-carrier-high-speed) — PCIe, M.2, HDMI/DDI, USB, SATA mux, toàn vẹn tín hiệu (signal integrity), FPC.
- [**Peripherals & Audio**](/docs/pcb-design/projects/intel-x86-carrier-peripherals) — audio ALC662, LAN, SPI BIOS, SMBus/I2C/UART/GPIO/EC.
- [**KiCad Workflow & Mechanical**](/docs/pcb-design/projects/intel-x86-carrier-kicad) — sơ đồ nguyên lý (schematic), layout, kiểm chứng (verification), nối đất (grounding).

:::caution Phụ thuộc nền tảng — hãy kiểm chứng theo tài liệu coreboard
Sơ đồ chân chính xác, các strap, các miền điện áp (voltage domain) và ánh xạ lane phụ thuộc vào coreboard
Intel cụ thể. Hãy coi các trang này như một điểm khởi đầu có cấu trúc và xác nhận lại chi tiết theo tài
liệu của coreboard trước khi chốt thiết kế.
:::
