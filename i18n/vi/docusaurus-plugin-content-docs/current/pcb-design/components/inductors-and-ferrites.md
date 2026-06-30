---
sidebar_position: 4
title: Cuộn cảm & Ferrite
---

# Cuộn cảm & Ferrite

Chúng cản lại **sự thay đổi** của dòng điện. Hai công dụng rất khác nhau: **cuộn cảm công suất**
tích trữ năng lượng trong bộ ổn áp đóng cắt; **ferrite bead** triệt nhiễu tần số cao.

## Cuộn cảm công suất (bộ ổn áp đóng cắt)

- Phần tử tích trữ năng lượng trong **buck/boost**. Giá trị và định mức dòng lấy từ datasheet của
  bộ ổn áp — hãy tuân theo.
- Thông số then chốt: **điện cảm**, **dòng bão hòa (Isat)** (đừng vượt — điện cảm sụp đổ), **DCR**
  (điện trở → tổn hao/nhiệt), và che chắn (shielded = ít nhiễu bức xạ hơn).
- Đặt **gần nút đóng cắt**; giữ vòng nóng nhỏ.

## Ferrite bead (lọc)

- Ferrite bead hành xử như một điện trở nhỏ ở tần số cao — nó **hấp thụ nhiễu HF** thành nhiệt.
  Định mức theo trở kháng **tại 100 MHz** (vd "600 Ω @ 100 MHz") và dòng DC.
- Dùng phổ biến: cách ly một **đường nguồn số nhiễu** khỏi một đường **analog/PLL/ADC nhạy cảm**
  (ferrite + tụ = bộ lọc LC/RC).

:::caution Đừng gắn ferrite cho đường số nhanh một cách bừa bãi
Một ferrite nối tiếp với đường nguồn dòng lớn hoặc nhanh có thể **cộng hưởng** với tụ decoupling và
khiến gợn nhiễu *tệ hơn*, hoặc bóp dòng quá độ. Dùng ferrite để **lọc các đường nhạy cảm**, không
phải mặc định trên mọi đường nguồn.
:::

## Common-mode choke

- Cho tín hiệu vi sai đi qua, chặn nhiễu **common-mode** — dùng trên USB, Ethernet, và đầu vào
  nguồn để giảm [EMI](/docs/pcb-design/fundamentals/emi-emc).

## Xem thêm

- [Mạch nguồn](/docs/pcb-design/circuit-blocks/power-supply)
- [Analog & Tín hiệu hỗn hợp](/docs/pcb-design/circuit-blocks/analog-mixed-signal) — đường nguồn sạch
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc)
