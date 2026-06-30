---
sidebar_position: 3
title: Quản lý nguồn
---

# Quản lý nguồn

Bảo vệ đầu vào, lựa chọn giữa nhiều nguồn cấp, và đóng cắt các đường nguồn gọn gàng — phần mạch nằm
giữa "nguồn vào" và các bộ ổn áp của bạn.

## Bảo vệ đầu vào

| Mối nguy | Bảo vệ |
| --- | --- |
| **Ngược cực** | Schottky nối tiếp (đơn giản) hoặc **P-FET** (tổn hao thấp) |
| **Quá dòng** | Cầu chì, **PTC tự phục hồi**, hoặc IC **eFuse** |
| **Quá áp / quá độ** | Ghim **TVS** (xem [Diode & Bảo vệ](/docs/pcb-design/components/diodes-and-protection)) |
| **Inrush** | Soft-start / load switch với slew kiểm soát, hoặc NTC |

Một IC **eFuse** gộp nhiều thứ này (giới hạn dòng, OVP, inrush, ngược cực) trong một linh kiện —
lựa chọn gọn cho một đầu vào bền bỉ.

## Đường nguồn & phân xử (arbiter)

Khi một bo có thể được cấp từ **nhiều nguồn** — vd USB, jack DC barrel, và pin — bạn cần **chọn**
nguồn nào cấp cho tải và chuyển đổi mượt mà giữa chúng.

- **Diode-OR (OR-ing kiểu ideal-diode):** mỗi nguồn cấp qua một ideal-diode/Schottky; nguồn có
  điện áp cao nhất thắng. Đơn giản, nhưng không có ưu tiên rõ ràng.
- **Mux ưu tiên / IC power MUX:** một IC **power-path / arbiter** áp đặt ưu tiên (vd "dùng adapter
  tường nếu có, không thì dùng pin") và chuyển **make-before-break** để đường nguồn không bị sụt.
- **PMIC / IC sạc pin có power-path:** cấp cho hệ thống *và* sạc pin từ cùng một đầu vào, chạy từ
  adapter khi có và từ pin khi không.
- **Load switch:** bật/tắt từng đường (sequencing, standby) với kiểm soát inrush.

```
Adapter ─┐
USB ─────┤─►  Power-path / arbiter  ─►  Đường nguồn hệ thống  ─►  Các bộ ổn áp
Pin ─────┘        (ưu tiên + make-before-break)
```

## Sequencing (trình tự)

- Nếu các đường phải lên theo thứ tự (core trước I/O, v.v.), dùng **chuỗi enable** hoặc một
  **supervisor / sequencer**, và thêm tín hiệu **power-good**.

:::tip Chọn mức tích hợp phù hợp
Với bất kỳ tổ hợp pin + USB + adapter nào, hãy dùng **PMIC power-path hoặc IC arbiter** thay vì
diode rời — nó tự lo ưu tiên, sạc và chuyển nguồn không gián đoạn.
:::

## Xem thêm

- [Mạch nguồn](/docs/pcb-design/circuit-blocks/power-supply)
- [Transistor & MOSFET](/docs/pcb-design/components/transistors-and-mosfets) — load switch
- [Topology nguồn](/docs/pcb-design/applied-circuits/power-topologies)
