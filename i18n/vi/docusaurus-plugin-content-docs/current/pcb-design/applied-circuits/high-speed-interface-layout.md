---
sidebar_position: 5
title: Layout giao tiếp tốc độ cao
---

# Layout giao tiếp tốc độ cao

Playbook định tuyến cụ thể cho các giao tiếp mà người ta hay làm sai nhất. Tất cả đều dựa trên cùng
một vật lý — [trở kháng kiểm soát](/docs/pcb-design/fundamentals/impedance-and-stackup) và
[đường hồi tiếp](/docs/pcb-design/fundamentals/return-paths-and-grounding) — áp dụng theo từng giao tiếp.

## DDR / RAM

- Layout khó nhất thường gặp. Dùng **hướng dẫn layout của bộ điều khiển bộ nhớ** — không phải tùy chọn.
- **Khớp chiều dài** trong mỗi byte lane (data + strobe) và giữa các nhóm address/command; tinh
  chỉnh bằng serpentine.
- Topology **fly-by** cho address/command trên DDR3/4; terminate theo spec.
- Giữ trên một **stackup** chặt với mặt phẳng tham chiếu liền; hạn chế via trên bus.

## HDMI / DisplayPort

- Cặp **vi sai 100 Ω**; skew trong cặp chặt; định tuyến các cặp theo nhóm.
- Giữ cặp TMDS/lane ngắn và tránh xa net nhiễu; **bảo vệ ESD** tại đầu nối (mảng ESD HDMI chuyên dụng).
- Mặt phẳng tham chiếu liên tục — không bao giờ cắt qua khe.

## PCIe

- **~85 Ω vi sai**, ngân sách tổn hao rất thấp. Hạn chế **via và stub**; back-drill trên bo dày nếu cần.
- **Tụ ghép AC (AC-coupling)** trên cặp TX (theo spec); giữ cặp khớp và ghép chặt.
- Tính liên tục của mặt phẳng tham chiếu là tối quan trọng; thêm khâu đất tại các điểm đổi lớp.

## USB

- **USB 2.0:** vi sai 90 Ω D+/D−, khớp chiều dài, ngắn; nối tiếp 22–33 Ω ở nơi PHY chỉ định;
  ESD/TVS tại đầu nối.
- **USB 3 / Type-C:** cặp SuperSpeed ~90 Ω, xử lý như PCIe (tổn hao thấp, ghép AC, ít via); xử lý
  CC/SBU và ESD.

## Quy tắc chung (cho tất cả ở trên)

- Quyết định **stackup trước**; định tuyến cặp nhanh trên một **mặt phẳng liền**.
- **Không bao giờ cắt qua khe mặt phẳng**; khâu đất tại mỗi điểm đổi lớp.
- Khớp chiều dài/skew theo spec giao tiếp; giữ stub và số via tối thiểu.
- **ESD tại đầu nối**, đường về đất ngắn.

:::tip Dùng hướng dẫn layout của hãng
Với DDR, PCIe, HDMI và USB3, hãng làm controller/PHY công bố hướng dẫn layout kèm dung sai chính
xác. Hãy tuân theo — các giao tiếp này khắt khe và không đáng để ứng biến.
:::

## Xem thêm

- [Tín hiệu số tốc độ cao](/docs/pcb-design/circuit-blocks/high-speed)
- [Trở kháng & Stackup](/docs/pcb-design/fundamentals/impedance-and-stackup)
- [Nguồn tham khảo & Reference Design](/docs/pcb-design/reference-designs) — nghiên cứu bo tốc độ cao thực tế
