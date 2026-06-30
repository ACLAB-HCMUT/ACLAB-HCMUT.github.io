---
sidebar_position: 4
title: Topology nguồn
---

# Topology nguồn

Các cách tiêu chuẩn để chuyển một điện áp sang điện áp khác, cùng hai chuẩn ứng dụng bạn sẽ gặp
thường xuyên: **USB-PD** và **PoE**.

## Các topology chuyển đổi

| Topology | Chiều | Cách ly? | Dùng khi |
| --- | --- | --- | --- |
| **LDO (tuyến tính)** | Hạ áp | Không | Sụt nhỏ, ít nhiễu, dòng thấp |
| **Buck** | Hạ áp | Không | Hạ áp hiệu quả (12 V → 3.3 V) |
| **Boost** | Tăng áp | Không | Đầu ra cao hơn đầu vào (pin → 5 V) |
| **Buck-boost** | Lên *hoặc* xuống | Không | Đầu vào cắt qua đầu ra (Li-ion 3.0–4.2 V → 3.3 V) |
| **Flyback** | Lên/xuống | **Có** | Nguồn cách ly, AC→DC, nhiều ngõ ra |

### Flyback (cách ly)

- Bộ đóng cắt dùng biến áp, **cách ly điện (galvanic)** đầu vào với đầu ra — lựa chọn hàng đầu cho
  **AC lưới → DC điện áp thấp** và bất cứ nơi nào cần cách ly/an toàn.
- Cần cẩn thận: thiết kế biến áp, snubber sơ cấp, chỉnh lưu đầu ra, và đường **hồi tiếp cách ly**
  (opto-coupler hoặc cuộn phụ). Tôn trọng creepage/clearance qua rào cách ly (xem
  [Điện tử công suất](/docs/pcb-design/circuit-blocks/power-electronics)).

## USB Power Delivery (USB-PD)

- Đàm phán điện áp/dòng cao hơn qua USB-C (5 V tới 20 V/48 V EPR) thông qua một **bộ điều khiển PD**
  giao tiếp trên các đường **CC**.
- Lưu ý thiết kế: một PD controller/PHY (sink hoặc source), pull-up/down **CC** (Rp/Rd) đúng và xử
  lý **VBUS**, cộng một buck để hạ VBUS đã đàm phán xuống các đường của bạn.

## Power over Ethernet (PoE)

- Cấp **nguồn** lẫn **dữ liệu** qua một cáp Ethernet. Front-end **PD (powered device)**: chỉnh lưu
  các cặp nguồn, trình **chữ ký nhận diện 25.5 k**, xử lý phân loại, rồi cấp cho một bộ chuyển đổi
  **flyback/forward** cách ly (PoE cách ly theo chuẩn).
- Dùng **PoE-PD controller** chuyên dụng + magnetics đúng; để ý cách ly và đầu vào ~48 V cao hơn.

:::caution Cách ly = an toàn
Flyback, PoE và nguồn lưới đều vượt qua một **rào cách ly**. Tôn trọng creepage/clearance, dùng linh
kiện cách ly đạt chuẩn, và đừng định tuyến đường mạch qua khe rào cách ly.
:::

## Xem thêm

- [Mạch nguồn](/docs/pcb-design/circuit-blocks/power-supply)
- [Quản lý nguồn](/docs/pcb-design/applied-circuits/power-management)
- [Cuộn cảm & Ferrite](/docs/pcb-design/components/inductors-and-ferrites)
