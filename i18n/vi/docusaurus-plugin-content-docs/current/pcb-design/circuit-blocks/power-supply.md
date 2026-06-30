---
sidebar_position: 3
title: Mạch nguồn (LDO, Buck, Boost)
---

# Mạch nguồn (LDO, Buck, Boost)

Mọi bo mạch đều cần biến điện áp đầu vào thành các đường nguồn sạch. Hai họ chính là **tuyến tính
(LDO)** và **đóng cắt (buck/boost)** — chọn theo từng đường, rồi layout đúng cho mỗi loại.

## Chọn bộ ổn áp

| Loại | Hiệu suất | Nhiễu | Độ phức tạp | Dùng khi |
| --- | --- | --- | --- | --- |
| **LDO (tuyến tính)** | Thấp (sụt áp thành nhiệt) | Rất thấp | Rất nhỏ | Sụt áp nhỏ, dòng thấp, nhạy nhiễu (RF, ADC, clock) |
| **Buck (hạ áp)** | Cao | Gợn do đóng cắt | Trung bình | Sụt áp lớn hoặc dòng cao (vd 12 V → 3.3 V) |
| **Boost (tăng áp)** | Cao | Gợn do đóng cắt | Trung bình | Đầu ra cao hơn đầu vào (vd pin → 5 V) |

Một mẫu phổ biến: **buck** để hạ áp phần lớn, rồi một **LDO** nhỏ để làm sạch một đường nhạy cảm.

## Layout LDO

- Tụ đầu vào và đầu ra **ngay tại chân**; tuân theo loại và giá trị tụ mà datasheet yêu cầu (tính
  ổn định phụ thuộc vào nó).
- Nó tiêu tán `(Vin − Vout) × I` thành **nhiệt** — thêm vùng đồng / via nhiệt khi dòng lớn.

## Layout buck (chỗ người ta hay làm sai)

- Giữ **vòng nóng (hot loop)** (tụ đầu vào → FET cao → FET thấp → về tụ) **nhỏ** hết mức — vòng
  này phát nhiễu.
- Tụ đầu vào sát IC; cuộn cảm đặt gần; **đường hồi tiếp tránh xa** nút đóng cắt và cuộn cảm (rất nhạy).
- Mặt đất liền dưới bộ ổn áp; khâu (stitch) bằng via.

## Bảo vệ & trình tự

- Bảo vệ **ngược cực** (FET nối tiếp hoặc diode) ở đầu vào.
- **Cầu chì / PTC** và một **TVS** cho quá độ/ESD trên các đầu vào hở.
- Nếu các đường phải lên theo thứ tự, hãy lập **trình tự cấp nguồn** (chân enable, supervisor).

:::caution Nhiệt & gợn nhiễu
LDO hỏng do **quá nhiệt** — luôn tính công suất tiêu tán. Buck hỏng do **nhiễu** — vòng nóng lớn
hoặc đặt sai đường hồi tiếp sẽ hiện ra dưới dạng gợn nhiễu và EMI.
:::

## Xem thêm

- [Điện tử công suất & Dòng lớn](/docs/pcb-design/circuit-blocks/power-electronics)
- [Xây dựng sản phẩm](/docs/embedded-firmware/building-a-product) — các chip hỗ trợ (LDO, v.v.)
- [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes)
