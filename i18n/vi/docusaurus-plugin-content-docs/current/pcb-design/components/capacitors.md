---
sidebar_position: 3
title: Tụ điện
---

# Tụ điện

Linh kiện phổ biến thứ hai. Hầu hết làm một trong ba việc: **decoupling**, **tích trữ năng lượng
(bulk)**, hoặc **lọc / chặn DC**.

## Use case thông dụng

| Giá trị | Nhiệm vụ điển hình |
| --- | --- |
| **100 nF (0.1 µF)** | **Decoupling** — một tụ cho mỗi chân nguồn IC, ngay tại chân |
| **1 µF – 10 µF** | Decoupling **bulk** cho mỗi đường nguồn, gần chip |
| **10 µF – 100 µF+** | **Bulk** tại đầu vào/đầu ra bộ ổn áp |
| **cỡ pF** | Tụ tải thạch anh, lọc RC/EMI, hồi tiếp |
| tụ nối tiếp | **Chặn DC / ghép AC** (vd audio, tốc độ cao) |

## Loại điện môi (rất quan trọng)

| Loại | Lớp | Dùng cho | Lưu ý |
| --- | --- | --- | --- |
| **C0G/NP0** | Gốm I | Định thời, lọc, giá trị nhỏ chính xác | Chỉ điện dung nhỏ |
| **X7R/X5R** | Gốm II | Decoupling, bulk MLCC | **Sụt theo DC-bias** (xem dưới) |
| **Electrolytic** | — | Bulk lớn, giá rẻ | Phân cực, lão hóa, ESR |
| **Tantalum/polymer** | — | Bulk gọn, ổn định | Phân cực; tantalum hỏng kiểu chập |
| **Film** | — | Audio, snubber, điện áp cao | Cồng kềnh |

:::caution Sụt điện dung theo DC-bias (MLCC)
Tụ gốm X5R/X7R mất một phần lớn điện dung khi có điện áp DC — một tụ "10 µF" có thể chỉ còn 3–4 µF
ở điện áp định mức. **Chọn dư điện áp định mức** (vd dùng tụ 25 V cho đường 5 V) và đừng tin con số
ghi trên nhãn cho bulk.
:::

## Decoupling — quy tắc

- **100 nF mỗi chân nguồn**, đặt tại chân với via ngắn xuống đất.
- Thêm **bulk** (1–10 µF) mỗi đường gần chip; **bulk lớn** tại bộ ổn áp.
- Nối ngắn, rộng; vòng từ tụ → chân → đất phải thật nhỏ (đây là vấn đề
  [SI/EMI](/docs/pcb-design/fundamentals/emi-emc)).

## Xem thêm

- [Mạch MCU & Số](/docs/pcb-design/circuit-blocks/mcu-and-digital) — decoupling trong ngữ cảnh
- [Mạch nguồn](/docs/pcb-design/circuit-blocks/power-supply)
- [Vùng đồng & Nhiệt](/docs/pcb-design/fundamentals/copper-pours-and-thermal) — điện dung mặt phẳng
