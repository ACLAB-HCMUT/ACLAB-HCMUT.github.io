---
sidebar_position: 2
title: Practice thông dụng
---

# Practice thông dụng

Những mẫu nhỏ, lặp lại tạo nên khác biệt giữa một bo chạy được và một bo "lẽ ra phải chạy". Hầu hết
là bảo hiểm giá rẻ — hãy làm theo mặc định.

## Luôn làm những điều này

- **Decouple mọi IC** — 100 nF mỗi chân nguồn tại chân, cộng bulk mỗi đường. Xem
  [Tụ điện](/docs/pcb-design/components/capacitors).
- **Pull-up / pull-down** ở nơi một đường có thể thả nổi:
  - **I²C** SDA/SCL → pull-up 2.2–4.7 kΩ (bus open-drain cần chúng).
  - Chân **reset, boot/strap, enable** → 10 kΩ về mức yêu cầu.
  - **Nút nhấn** → kéo về trạng thái xác định; debounce bằng HW hoặc SW.
- **Chân không dùng** — đừng để đầu vào thả nổi (nối hoặc cấu hình); để ngõ ra không dùng theo
  datasheet.
- **Điện trở nối tiếp** — 22–33 Ω trên USB / đường nhanh (termination); một điện trở nối tiếp với
  thạch anh/LED ở nơi được chỉ định.
- **Pull-down gate** trên mọi MOSFET để nó tắt khi cấp nguồn.

## Luôn có sẵn

- **Header nạp/debug** (SWD/JTAG/UART) — đưa ra ngoài và ghi nhãn.
- **Test point** trên các net quan trọng (đường nguồn, tín hiệu quan trọng) để bring-up.
- **LED nguồn/hoạt động** (kèm điện trở nối tiếp) — phản hồi tức thì "nó còn sống không?".
- **Lỗ bắt vít**, fiducial (cho lắp ráp), và **silkscreen** rõ ràng (refdes, chân 1, cực tính).

## Bảo vệ ranh giới với thế giới bên ngoài

- **TVS/ESD** trên mọi đầu nối/chân hở; bảo vệ **ngược cực** trên đầu vào nguồn. Xem
  [Quản lý nguồn](/docs/pcb-design/applied-circuits/power-management).

:::tip Lập checklist cá nhân
Giữ một checklist trước khi đặt hàng gồm các mục này. Hầu hết sự cố "bo chết" lúc bring-up là do
thiếu một trong số chúng — không phải lỗi thiết kế.
:::

## Xem thêm

- [Điện trở](/docs/pcb-design/components/resistors) — bảng tra giá trị pull/series
- [Mạch MCU & Số](/docs/pcb-design/circuit-blocks/mcu-and-digital)
- [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes)
