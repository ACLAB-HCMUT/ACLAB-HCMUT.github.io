---
sidebar_position: 6
title: Vùng đồng & Nhiệt
---

# Vùng đồng & Nhiệt

Cách bạn phủ đồng và nối pad ảnh hưởng tới **toàn vẹn nguồn**, **nhiệt** và **sản xuất**. Hai công
cụ hằng ngày: **vùng đồng (copper pour / fill zone)** và **thermal relief**.

## Vùng đồng (fill zone)

Một **fill zone** phủ đồng cho một vùng của lớp, gắn vào một net (thường là GND hoặc một đường nguồn).

- **Mặt phẳng đất/nguồn** dưới dạng vùng đồng cho đường hồi tiếp và cấp nguồn trở kháng thấp, và
  thêm **điện dung mặt phẳng** (cặp mặt nguồn+đất hoạt động như một tụ decoupling phân tán nhỏ).
- **Khâu (stitch)** các vùng đồng ở các lớp khác nhau bằng via để chúng hoạt động như một mặt phẳng.
- Tránh **mảnh đồng/đảo nhỏ** mỏng — đặt bề rộng tối thiểu và loại bỏ các mảnh vùng đồng cô lập
  (vô dụng và có thể gây vấn đề).
- Đừng phủ đồng làm phân mảnh mặt phẳng tham chiếu dưới tín hiệu nhanh — vùng đồng không phải lý do
  để phá vỡ [đường hồi tiếp](/docs/pcb-design/fundamentals/return-paths-and-grounding).

## Thermal relief vs nối đặc (solid)

Khi một pad nối tới vùng đồng lớn, cách nối rất quan trọng:

| Kiểu nối | Trông như | Dùng cho |
| --- | --- | --- |
| **Thermal relief** | Các nan hoa ("bánh xe") | **Hàn** — các nan hoa ngăn vùng đồng hút hết nhiệt, nên pad nóng lên và hàn được đúng |
| **Solid (nối đặc)** | Nối đồng kín hoàn toàn | **Dẫn dòng/nhiệt** — chân dòng lớn, thermal pad cần đổ nhiệt vào mặt phẳng |

Quy tắc kinh nghiệm: **thermal relief cho hàn tay/đa số lắp ráp; solid cho dòng lớn và nối
thermal-pad** (nơi bạn chấp nhận khó rework hơn để dẫn tốt hơn).

## Quản lý nhiệt

- Đặt **via nhiệt** dưới linh kiện nóng (ổn áp, FET, thermal pad công suất) để chuyển nhiệt sang
  đồng lớp trong/mặt đối diện.
- Dùng **vùng đồng** làm heatsink; càng nhiều diện tích đồng, độ tăng nhiệt càng thấp.
- **Đồng dày** hơn (2 oz+) cho bo dòng lớn/nhiệt cao.
- Cho linh kiện nóng khoảng thở; đừng vùi chúng dưới các linh kiện cao kề bên.

:::caution Bẫy "pad lạnh"
Một pad dòng lớn nối **solid** vào vùng đất lớn có thể gần như không thể hàn tay — vùng đồng hút
hết nhiệt. Dùng **thermal relief** để hàn được, hoặc gia nhiệt sơ (preheat) bo.
:::

## Xem thêm

- [Điện tử công suất & Dòng lớn](/docs/pcb-design/circuit-blocks/power-electronics)
- [Đường hồi tiếp & Nối đất](/docs/pcb-design/fundamentals/return-paths-and-grounding)
- [Từ thiết kế đến giao hàng](/docs/pcb-design/fabrication-and-ordering)
