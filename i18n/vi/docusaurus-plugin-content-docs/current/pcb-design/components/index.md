---
sidebar_position: 1
title: Linh kiện & Components
---

# Linh kiện & Components

Tài liệu tham khảo thực hành cho các linh kiện bạn đặt trên hầu hết mọi bo — chúng làm gì, các giá
trị bạn thực sự hay dùng, và các **use case thông dụng** (vd "10 kΩ thường là pull-up").

## Danh mục

| Linh kiện | Làm gì | Trang |
| --- | --- | --- |
| **Điện trở** | Hạn dòng, đặt điện áp, pull-up/down, termination | [Điện trở](/docs/pcb-design/components/resistors) |
| **Tụ điện** | Decoupling, lọc, tích trữ, chặn DC/ghép AC | [Tụ điện](/docs/pcb-design/components/capacitors) |
| **Cuộn cảm & ferrite** | Tích năng lượng (ổn áp), lọc | [Cuộn cảm & Ferrite](/docs/pcb-design/components/inductors-and-ferrites) |
| **Diode & bảo vệ** | Chỉnh lưu, ghim áp, bảo vệ (Schottky, Zener, TVS) | [Diode & Bảo vệ](/docs/pcb-design/components/diodes-and-protection) |
| **Transistor & MOSFET** | Đóng cắt và khuếch đại; load switch, gate drive | [Transistor & MOSFET](/docs/pcb-design/components/transistors-and-mosfets) |

## Đọc giá trị

- **Điện trở/tụ** theo **E-series** (E12/E24/E96) — không mua "giá trị bất kỳ", bạn chọn giá trị
  chuẩn gần nhất. 10 k, 4.7 k, 1 k, 100 nF, 10 µF là những giá trị quen thuộc.
- **Kích thước vỏ** (0402, 0603, 0805…) đánh đổi giữa dễ hàn tay và mật độ. **0603/0805** là mặc
  định dễ chịu cho việc trong lab; **0402** cho bo dày đặc.
- Luôn kiểm tra **điện áp định mức** (tụ), **công suất định mức** (điện trở) và **dung sai**.

:::tip Tạo "house style"
Chọn một bộ nhỏ các giá trị và vỏ hay dùng (vd 0603, tụ 100 nF/10 µF, 10 k/4.7 k/1 k/0 Ω, 33 Ω) và
tái sử dụng. Càng ít linh kiện khác nhau = BOM rẻ hơn, lắp ráp nhanh hơn.
:::

## Xem thêm

- [Thiết kế theo khối mạch](/docs/pcb-design/circuit-blocks)
- [Mạch & Practice thông dụng](/docs/pcb-design/applied-circuits)
