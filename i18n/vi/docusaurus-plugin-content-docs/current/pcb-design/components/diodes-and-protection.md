---
sidebar_position: 5
title: Diode & Bảo vệ
---

# Diode & Bảo vệ

Diode chỉ cho dòng đi một chiều. Tính chất đơn giản đó tạo nên chỉnh lưu, ghim áp và cả một họ
linh kiện **bảo vệ**.

## Các loại diode

| Loại | Đặc tính chính | Công dụng điển hình |
| --- | --- | --- |
| **Thường / chỉnh lưu** | Dẫn một chiều | Chỉnh lưu AC, chặn dòng |
| **Schottky** | Sụt áp thuận thấp, nhanh | Freewheel, OR-ing, chống ngược cực, buck |
| **Zener** | Dẫn ngược tại Vz | Ghim áp / tham chiếu thô |
| **TVS** | Ghim nhanh, năng lượng cao | **Bảo vệ quá độ/ESD** |
| **LED** | Phát sáng | Đèn báo (với điện trở nối tiếp) |

## Diode TVS (bảo vệ quá độ)

- **TVS** ghim một xung điện áp (ESD, surge, back-EMF cảm) bằng cách dẫn mạnh trên ngưỡng đánh
  thủng, bảo vệ linh kiện phía sau.
- Đặt một con trên **mọi đường hở ra ngoài**: USB, đầu vào nguồn, nút nhấn, đầu nối.
- Chọn **điện áp làm việc** trên tín hiệu bình thường, **điện áp ghim** dưới mức linh kiện chịu
  được; đặt **ngay tại đầu nối** với đường về đất ngắn.

## Diode flyback / freewheel

- Mắc ngang một **tải cảm** (relay, động cơ, solenoid), diode cho dòng đang sụp đổ một lối đi —
  không có nó, back-EMF tạo xung và phá hỏng mạch lái.

## Linh kiện bảo vệ khác

- **Chống ngược cực:** Schottky nối tiếp (đơn giản) hoặc P-FET (tổn hao thấp).
- **Quá dòng:** cầu chì, **PTC tự phục hồi**, hoặc IC **eFuse**.
- **Quá áp:** ghim Zener/TVS, hoặc OVP chủ động.

:::tip Bảo vệ tại biên
ESD và surge xâm nhập qua **đầu nối**. Tập trung linh kiện TVS/ESD và lọc tại cạnh bo/đầu nối, với
đường về đất ngắn nhất có thể.
:::

## Xem thêm

- [Quản lý nguồn](/docs/pcb-design/applied-circuits/power-management) — ngược cực/quá dòng/arbiter
- [Điện tử công suất & Dòng lớn](/docs/pcb-design/circuit-blocks/power-electronics)
